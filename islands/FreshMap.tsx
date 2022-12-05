import { useRef, useEffect } from 'preact/hooks';

// TODO: less hacks... probably an external pure SPA we load

const mapElements = `
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
    crossorigin=""
  />
  <div id="map" style="height: 180px;"></div>
`;

export default function FreshMap() {
  const div = useRef(null);
  useEffect(() => {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    div.current.innerHTML = mapElements;
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
    document.body.appendChild(leafletScript);
    leafletScript.addEventListener('load', () => {
      const script = document.createElement('script');
      const textCode = document.createTextNode(`
      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var marker = L.marker([51.5, -0.09]).addTo(map);
    `);
      script.appendChild(textCode);
      document.body.appendChild(script);
    });
  }, [div]);
  return <div ref={div}></div>;
}
