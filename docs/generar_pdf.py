# Convierte docs/documentacion.md en docs/documentacion.pdf
#
# Requisitos: Python con el paquete "markdown" (python -m pip install markdown)
# y Microsoft Edge instalado (viene con Windows).
# Uso, desde la raíz del proyecto:  python docs/generar_pdf.py

import pathlib
import subprocess
import tempfile

import markdown

carpeta_docs = pathlib.Path(__file__).resolve().parent
archivo_md = carpeta_docs / "documentacion.md"
archivo_pdf = carpeta_docs / "documentacion.pdf"
edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Estilos solo para el PDF (no afectan al sitio)
estilos = """
@page { size: A4; margin: 2cm 1.8cm; }
body { font-family: "Segoe UI", Arial, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #1d2b3a; }
h1, h2, h3 { color: #16324f; }
h2 { border-bottom: 2px solid #26749a; padding-bottom: 4px; margin-top: 28px; break-after: avoid; }
h3 { break-after: avoid; }
table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 9.5pt; break-inside: auto; }
th, td { border: 1px solid #cfdbe5; padding: 5px 7px; text-align: left; vertical-align: top; }
th { background: #26749a; color: #fff; }
tr { break-inside: avoid; }
tbody tr:nth-child(even) { background: #eef4f8; }
code { background: #eef4f8; padding: 0 3px; border-radius: 3px; font-size: 9.5pt; }
pre { background: #eef4f8; padding: 10px; border-radius: 6px; font-size: 9pt; white-space: pre-wrap; break-inside: avoid; }
pre code { padding: 0; }
img { display: block; max-width: 100%; max-height: 17cm; margin: 10px auto; border: 1px solid #cfdbe5; break-inside: avoid; }
.portada-doc { text-align: center; padding-top: 5cm; break-after: page; }
.portada-doc h1 { font-size: 30pt; border: none; }
.portada-doc h2 { border: none; font-weight: normal; color: #26749a; }
"""

texto = archivo_md.read_text(encoding="utf-8")
cuerpo = markdown.markdown(texto, extensions=["tables", "fenced_code", "md_in_html"])
# En el .md, "\|" escapa la barra dentro de las tablas; en el PDF se ve sin "\"
cuerpo = cuerpo.replace("\\|", "|")

# <base> hace que las rutas "capturas/..." se busquen dentro de docs/
html = f"""<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8">
<base href="{carpeta_docs.as_uri()}/">
<title>Documentación · Tienda de Útiles Escolares</title>
<style>{estilos}</style></head>
<body>{cuerpo}</body></html>"""

with tempfile.TemporaryDirectory() as temporal:
    archivo_html = pathlib.Path(temporal) / "documentacion.html"
    archivo_html.write_text(html, encoding="utf-8")
    subprocess.run([
        edge, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
        "--no-pdf-header-footer", f"--print-to-pdf={archivo_pdf}",
        archivo_html.as_uri(),
    ], check=True)

print("PDF creado:", archivo_pdf)
