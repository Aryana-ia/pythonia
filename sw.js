/* Pythonia · service worker
   Guarda la app, el motor de Python y los manuales para que todo funcione sin conexión.
   Al publicar una versión nueva, sube el número de VERSION: la app se actualiza sola la próxima vez que se abre. */
const VERSION = "pythonia-v2.0.0";
const NUCLEO = [
  "./", "index.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-192.png", "icons/maskable-512.png",
  "icons/apple-touch-icon.png", "icons/favicon.png",
  "vendor/brython/brython.min.js", "vendor/brython/brython_stdlib.js",
];
const MANUALES = [
  "pdf/Pythonia_Manual_Nivel1_Explorador.pdf", "pdf/Pythonia_Manual_Nivel2_Constructor.pdf",
  "pdf/Pythonia_Manual_Nivel3_Arquitecto.pdf", "pdf/Pythonia_Manual_Nivel4_Maestro.pdf",
  "pdf/Pythonia_Ruta_Automatizacion.pdf", "pdf/Pythonia_Ruta_Videojuegos.pdf",
  "pdf/Pythonia_Ruta_Bases_de_datos.pdf", "pdf/Pythonia_Cuadernillo_Diario.pdf",
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(NUCLEO);                                  // imprescindible: si falla, no se instala
    await Promise.allSettled(MANUALES.map(u => c.add(u)));   // los PDF, si se puede
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Página: primero la red (para recibir actualizaciones), si no hay conexión, la copia guardada
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const copia = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copia)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Archivos propios: primero la copia guardada
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req).then(res => {
      if (res.ok) { const copia = res.clone(); caches.open(VERSION).then(c => c.put(req, copia)); }
      return res;
    })));
    return;
  }
  // Fuentes de Google: copia guardada y se refresca en segundo plano
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const guardada = await c.match(req);
      const red = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => guardada);
      return guardada || red;
    }));
  }
});
