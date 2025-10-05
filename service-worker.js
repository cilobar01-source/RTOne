
const CACHE_NAME="rt-v27b-cache";
const ASSETS=["./","./index.html","./style.css","./smartinfo.js","./script.js","./manifest.json",
              "./assets/icon-32.png","./assets/icon-96.png","./assets/icon-192.png","./assets/icon-512.png",
              "./assets/hero-banner.png","./assets/logo.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))) });
self.addEventListener("fetch",e=>{ e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request).catch(()=>caches.match("./index.html")))) });
