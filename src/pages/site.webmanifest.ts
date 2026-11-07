import site from '../data/site.json';

export function GET() {
  const manifest = {
    name: site.nom,
    short_name: site.nom,
    lang: 'fr',
    start_url: '/',
    display: 'browser',
    background_color: '#FAF3EA',
    theme_color: '#FAF3EA',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
