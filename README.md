# 🐍 Pythonia: aprende Python jugando

App en español para aprender Python desde cero hasta nivel avanzado, con un tronco común de 4 niveles, ramas de especialización, prácticas que se corrigen solas y un proyecto real que se arma pieza a pieza.

**Abrir la app:** https://aryana-ia.github.io/pythonia/

## Qué trae

- **4 niveles del tronco** (Explorador, Constructor, Arquitecto y Maestro), con 41 lecciones, y **3 rutas completas** (Automatización, Videojuegos y Bases de datos) de las 13 previstas.
- **77 prácticas evaluables.** Escribes tu solución en la lección y la app la ejecuta con Python real ([Brython](https://brython.info/)) contra pruebas. Te dice qué caso falló, por qué, y te da pistas.
- **Un proyecto por nivel** que crece con cada práctica aprobada: *Adivina el número*, *Gestor de tareas*, *Monitor de precios* y *Framework con plugins*. Lo ejecutas en la app o lo descargas en `.zip` para abrirlo en tu IDE.
- **Manuales PDF y Cuadernillo-Diario** para leer, imprimir y anotar, en la carpeta `pdf/`.
- **Funciona sin conexión** una vez instalada: lecciones, prácticas, proyectos y manuales.

## Instalarla

- **Android (Chrome):** abre la dirección → menú ⋮ → **Instalar app**. También aparece un botón **Instalar Pythonia** en el Inicio.
- **iPhone (Safari):** abre la dirección → **Compartir** → **Agregar a inicio**.
- **PC (Chrome o Edge):** ícono de instalar en la barra de direcciones, o menú → **Instalar Pythonia**.

## Llevar el progreso entre versiones

El progreso se guarda en cada navegador. Para pasarlo entre la app instalable y la versión de Claude (o entre dos dispositivos), entra a **Inicio → Pythonia instalable**:

1. En el dispositivo de origen, toca **Copiar mi progreso**.
2. En el de destino, toca **Pegar progreso**, pega el código y confirma.

Se suma, no se pisa nada: se conserva lo mejor de cada lado.

## Estructura del repositorio

| Ruta | Qué es |
|---|---|
| `index.html` | La app completa: contenido, prácticas y motor de evaluación |
| `sw.js` | Service worker: guarda todo para usarlo sin conexión |
| `manifest.webmanifest` | Datos para instalarla (nombre, colores, íconos) |
| `icons/` | Íconos de la app |
| `vendor/brython/` | Brython 3.14.3, el intérprete de Python que corre en el navegador (licencia BSD-3-Clause) |
| `pdf/` | Manuales de los 4 niveles, de las 3 rutas y el Cuadernillo-Diario |
| `.nojekyll` | Le indica a GitHub Pages que publique los archivos tal cual |

## Publicar una versión nueva

1. Reemplaza los archivos que cambiaron (normalmente `index.html` y los PDF).
2. En `sw.js`, sube el número de `VERSION` (por ejemplo, de `pythonia-v2.0.0` a `pythonia-v2.0.1`).
3. Haz commit y push. La app instalada se actualiza sola la próxima vez que se abre con conexión.

## Limitaciones conocidas

- El intérprete del navegador no tiene `collections.deque`, `asyncio` real ni `csv.DictWriter`. Las prácticas no los usan; esos temas se prueban en el IDE con el proyecto descargado.
- En la app instalable, la revisión de código por Claude no está disponible. Si el motor no pudiera cargarse, la app ofrece una autorrevisión comparando con la solución.

---

Proyecto de Ariana G. Romero Rodríguez, construido con Claude.
