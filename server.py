#!/usr/bin/env python3

import sys
import argparse
from http.server import SimpleHTTPRequestHandler, HTTPServer

def test(port=8080, bind=""):
    server_address = (bind, port)
    HandlerClass = SimpleHTTPRequestHandler
    HandlerClass.protocol_version = "HTTP/1.0"
    with HTTPServer(server_address, HandlerClass) as httpd:
        host, port = httpd.socket.getsockname()
        print("Server now live at http://{0}:{1}/ ...".format(host, port))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received, exiting.")
            sys.exit(0)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('port', default=8080, type=int, nargs='?',
                        help='Specify alternate port [default: 8080]')
    parser.add_argument('--bind', '-b', default='', metavar='ADDRESS',
                        help='Specify alternate bind address [default: all interfaces]')
    args = parser.parse_args()
    test(port=args.port, bind=args.bind)
