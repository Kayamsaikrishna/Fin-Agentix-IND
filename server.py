
import http.server
import socketserver
import os

PORT = 8082

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")
        self.end_headers()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

# Change to the api-docs directory before starting the server
# This is crucial so the server finds swagger.json at the root
if os.path.exists('api-docs'):
    os.chdir('api-docs')
else:
    print("Error: 'api-docs' directory not found. Please run from project root.")
    exit()

with socketserver.TCPServer(("0.0.0.0", PORT), CORSRequestHandler) as httpd:
    print(f"Serving at port {PORT} from directory {os.getcwd()}")
    httpd.serve_forever()
