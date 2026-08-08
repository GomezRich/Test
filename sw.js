// Guarda una copia de la app en el celular la primera vez que abre con
// internet. Después de eso, el celular ya la puede abrir sin conexión.
const CACHE = 'pulperia-v1';
const ARCHIVOS = ['./mi-pulperia.html', './manifest.json'];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  self.clients.claim();
});

self.addEventListener('fetch', (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respuesta) => respuesta || fetch(evento.request))
  );
});
