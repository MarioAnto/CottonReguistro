// PROTEKTA AGRICULTURA - service worker (modo sin conexión)
// Pon este archivo y manifest.webmanifest junto a PROTEKTAAGRICOLA_v7.html en el mismo servidor HTTPS.
const VERSION = 'protekta-agro-v7';
const SHELL = ['./', './PROTEKTAAGRICOLA_v7.html', './manifest.webmanifest'];
const TILE_HOSTS = ['server.arcgisonline.com', 'tile.openstreetmap.org'];
const TILE_LIMIT = 600;   // máximo de mosaicos guardados

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('protekta-agro-') && k !== VERSION && k !== VERSION + '-tiles').map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

async function trimCache(name, max) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);

    // La API del clima siempre en línea
    if (url.hostname === 'api.open-meteo.com') return;

    // Mosaicos del mapa: usa el guardado y actualiza en segundo plano
    if (TILE_HOSTS.some(h => url.hostname.endsWith(h))) {
        e.respondWith((async () => {
            const cache = await caches.open(VERSION + '-tiles');
            const hit = await cache.match(req);
            const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') { cache.put(req, res.clone()); trimCache(VERSION + '-tiles', TILE_LIMIT); } return res; }).catch(() => hit);
            return hit || net;
        })());
        return;
    }

    // Resto (página, Tailwind, Leaflet, Turf, FontAwesome): red primero y caché de respaldo
    e.respondWith(
        fetch(req).then(res => {
            if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
            return res;
        }).catch(() => caches.match(req).then(r => r || caches.match('./PROTEKTAAGRICOLA_v7.html')))
    );
});
