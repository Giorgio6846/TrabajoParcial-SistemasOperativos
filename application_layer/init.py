#! /usr/bin/python3

from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
from socketserver import ThreadingMixIn
import threading

hostName = "0.0.0.0"
serverPort = 80

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        #curl http://<ServerIP>/index.html
        if self.path == "/":
        #Respond with the file contents
            self.send_response(200)
            self.send_header