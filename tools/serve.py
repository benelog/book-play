#!/usr/bin/env python3
"""Static server with pretty URLs for the game.
   /books/<id>, /books/<id>/chapters/<n>, /books/<id>/chapters/<n>/play  -> index.html
   Everything else is served as a file. Usage: python3 tools/serve.py [port] (default 8765)"""
import http.server, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROUTE = re.compile(r'^/books/[^/]+(?:/chapters/\d+(?:/(?:play|read))?)?/?$')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)
    def do_GET(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        # Pretty book URLs only: never shadow a real file (e.g. /books/<id>/scenes.js) or a dotted name
        if ROUTE.match(path) and '.' not in path.split('/')[2] and not os.path.isfile(os.path.join(ROOT, path.lstrip('/'))):
            self.path = '/index.html'
        return super().do_GET()
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, fmt, *args):
        sys.stdout.write("%s %s\n" % (self.address_string(), fmt % args)); sys.stdout.flush()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    with http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler) as httpd:
        print(f'Serving {ROOT} at http://127.0.0.1:{port}/  (Ctrl+C to stop)')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
