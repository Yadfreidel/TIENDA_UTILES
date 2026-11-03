from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from playwright.sync_api import sync_playwright

class ServidorSilencioso(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

servidor = ThreadingHTTPServer(('127.0.0.1', 0), ServidorSilencioso)
Thread(target=servidor.serve_forever, daemon=True).start()
base = 'http://127.0.0.1:' + str(servidor.server_port)
with sync_playwright() as p:
    navegador = p.chromium.launch(channel='msedge', headless=True)
    pagina = navegador.new_page()
    errores = []
    pagina.on('pageerror', lambda error: errores.append(str(error)))
    for ancho in [1280, 390]:
        pagina.set_viewport_size({'width': ancho, 'height': 900})
        for archivo in ['index.html', 'servicios.html', 'contacto.html']:
            respuesta = pagina.goto(base + '/' + archivo)
            assert respuesta.status == 200
            assert pagina.evaluate('document.documentElement.scrollWidth <= innerWidth')
            assert pagina.locator('nav a').count() == 3
            assert pagina.locator('nav a[aria-current="page"]').count() == 1
            assert pagina.locator('img').evaluate_all('(imgs) => imgs.every(i => i.complete && i.naturalWidth > 0)')
            if archivo == 'servicios.html':
                pagina.locator('iframe').scroll_into_view_if_needed()
                assert pagina.frame_locator('iframe').locator('h1').inner_text() == 'Antes de ir a clase'
                pagina.locator('audio').evaluate('(audio) => audio.load()')
                pagina.wait_for_function('document.querySelector("audio").readyState >= 1')
                assert pagina.locator('audio').evaluate('(audio) => audio.duration > 0 && audio.controls && !audio.autoplay')
                pagina.locator('audio').evaluate('(audio) => audio.play()')
                pagina.wait_for_function('document.querySelector("audio").currentTime > 0')
                pagina.locator('audio').evaluate('(audio) => audio.pause()')
            if archivo == 'index.html':
                pagina.locator('summary').click()
                assert pagina.locator('details').get_attribute('open') is not None
            if ancho == 390:
                Path('revision').mkdir(exist_ok=True)
                pagina.screenshot(path='revision/' + archivo + '.png', full_page=True)
    pagina.goto(base + '/contacto.html')
    pagina.get_by_role('button', name='Comprobar campos').click()
    assert pagina.locator('#resultado').inner_text() == ''
    assert not pagina.locator('form').evaluate('(f) => f.checkValidity()')
    pagina.locator('#nombre').fill('Prueba')
    pagina.locator('#correo').fill('prueba@example.com')
    pagina.locator('#producto').select_option('cuaderno')
    pagina.locator('#cantidad').fill('0')
    assert not pagina.locator('#cantidad').evaluate('(e) => e.checkValidity()')
    pagina.locator('#cantidad').fill('2')
    pagina.locator('#uso').check()
    pagina.locator('#mensaje').fill('Consulta de prueba sobre cuadernos.')
    pagina.locator('#demostracion').check()
    assert pagina.locator('form').evaluate('(f) => f.checkValidity()')
    peticiones = []
    pagina.on('request', lambda r: peticiones.append(r.url))
    pagina.get_by_role('button', name='Comprobar campos').click()
    assert 'No se envi' in pagina.locator('#resultado').inner_text()
    assert peticiones == []
    with pagina.expect_download() as descarga:
        pagina.get_by_text('Descargar catálogo de texto').click()
    assert descarga.value.suggested_filename == 'catalogo.txt'
    assert not errores, errores
    print('OK: escritorio/movil, imagenes, iframe, audio reproducible, detalles, validacion, bloqueo de envio y descarga.')
    navegador.close()
servidor.shutdown()
