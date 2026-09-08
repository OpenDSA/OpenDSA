#!/usr/bin/env python3
"""Dev server for OpenDSA testing: like `python3 -m http.server 8000`
but tells the browser never to cache, so code changes always show up.
Usage: python3 serve.py [port]"""
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
print(f"Serving (no-cache) at http://localhost:{port}")
HTTPServer(("", port), NoCacheHandler).serve_forever()
