import sys
from http.server import SimpleHTTPRequestHandler
import http.server


def test(HandlerClass=SimpleHTTPRequestHandler,
         ServerClass=http.server.HTTPServer):

    protocol = "HTTP/1.0"
    host = 'lti.cs.vt.edu'
    port = 8000
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if ':' in arg:
            host, port = arg.split(':')
            port = int(port)
        else:
            try:
                port = int(sys.argv[1])
            except:
                host = sys.argv[1]

    server_address = (host, port)

    HandlerClass.protocol_version = protocol
    httpd = ServerClass(server_address, HandlerClass)

    sa = httpd.socket.getsockname()
    print(("Serving HTTP on", sa[0], "port", sa[1], "..."))
    httpd.serve_forever()


if __name__ == "__main__":
    test()
