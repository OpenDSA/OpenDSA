#! /usr/bin/env python

""" Runs a simple web server for viewing OpenDSA books. 
This allows us to see the Khan Academy exercises and JSAV code objects 
correctly without a full webserver running.  
With python 3 installed, just run the command: 'python3 server.py'.
Then point your web browser to one of the addresses listed.  
Any created will be in the 'Books' directory.
Pressing Ctrl + C at the command line should stop the webserver at any time.
"""

import sys
import argparse
from http.server import SimpleHTTPRequestHandler, HTTPServer
from socket import gethostname, getfqdn, gethostbyname

def makeSimpleServer(port=8080, bind=""):
    server_address = (bind, port)
    HandlerClass = SimpleHTTPRequestHandler
    HandlerClass.protocol_version = "HTTP/1.0"
    with HTTPServer(server_address, HandlerClass) as httpd:
        host, port = httpd.socket.getsockname()
        if host == "0.0.0.0":
            hosts = ["localhost", "127.0.0.1", gethostname(), getfqdn(), gethostbyname(gethostname())]
            print("Server now live at these addresses:")
            for realHost in set(hosts):
                print("    http://{0}:{1}/".format(realHost, port))
        else:
            print("Server now live at http://{0}:{1}/".format(host, port))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received, stopping server.")
            sys.exit(0)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('port', default=8080, type=int, nargs='?',
                        help='Specify alternate port [default: 8080]')
    parser.add_argument('--bind', '-b', default='', metavar='ADDRESS',
                        help='Specify alternate bind address [default: all interfaces]')
    args = parser.parse_args()
    makeSimpleServer(port=args.port, bind=args.bind)
