from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from urllib.request import Request, urlopen
import json

class Documento(HTMLParser):
    def __init__(self, texto):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.feed(texto)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

for nombre in ['index.html', 'servicios.html', 'contacto.html', 'guia.html']:
    texto = Path(nombre).read_text(encoding='utf-8')
    doc = Documento(texto)
    ids = [a['id'] for _, a in doc.tags if 'id' in a]
    assert len(ids) == len(set(ids)), nombre + ': identificadores repetidos'
    assert sum(t == 'h1' for t, _ in doc.tags) == 1
    assert sum(t == 'main' for t, _ in doc.tags) == 1
    for tag, attrs in doc.tags:
        for clave in ['href', 'src']:
            valor = attrs.get(clave, '')
            ruta = urlsplit(valor)
            if not valor or ruta.scheme or ruta.netloc:
                continue
            destino = Path(unquote(ruta.path)) if ruta.path else Path(nombre)
            assert destino.is_file(), f'{nombre}: no existe {destino}'
            if ruta.fragment:
                otro = Documento(destino.read_text(encoding='utf-8'))
                assert any(a.get('id') == ruta.fragment for _, a in otro.tags)
        if tag == 'img':
            assert attrs.get('alt')
        if tag in ['input', 'select', 'textarea']:
            assert attrs.get('name') and attrs.get('id')
            assert any(t == 'label' and a.get('for') == attrs['id'] for t, a in doc.tags)
    print(nombre + ': estructura basica, rutas, anclas y etiquetas comprobadas')
    try:
        peticion = Request('https://validator.w3.org/nu/?out=json', data=texto.encode('utf-8'), headers={'Content-Type': 'text/html; charset=utf-8', 'User-Agent': 'StudentHTMLReview/1.0'})
        with urlopen(peticion, timeout=25) as respuesta:
            resultado = json.load(respuesta)
        Path('validacion-' + nombre + '.json').write_text(json.dumps(resultado, ensure_ascii=False, indent=2), encoding='utf-8')
        print('W3C:', json.dumps(resultado.get('messages', []), ensure_ascii=True))
    except Exception as error:
        print('W3C no disponible:', str(error))
