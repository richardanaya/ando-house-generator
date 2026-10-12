import { defineConfig, type Plugin } from 'vite';

/** Pages serves the built index.html. The dev server keeps the TypeScript entry. */
function serveDevIndex(): Plugin {
  return {
    name: 'serve-dev-index',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        // Connect's request type omits `url` unless @types/node is installed.
        const request = req as { url?: string };
        if (!request.url) return next();
        const query = request.url.indexOf('?');
        const path = query === -1 ? request.url : request.url.slice(0, query);
        const search = query === -1 ? '' : request.url.slice(query);
        if (path === '/' || path === '/index.html') {
          request.url = `/index.dev.html${search}`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 5173 },
  preview: { host: '127.0.0.1', port: 4173 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.dev.html',
    },
  },
  plugins: [serveDevIndex()],
});
