import socket
import selectors
import types
import json

from routes import type_mensage
print(socket.gethostbyname(socket.gethostname()))

HOST = "172.17.0.2"  
PORT = 4005  

sel = selectors.DefaultSelector()
backup = {}

lsock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
lsock.bind((HOST, PORT))
lsock.listen()
print(f"Listening on {(HOST, PORT)}")
lsock.setblocking(False)
sel.register(lsock, selectors.EVENT_READ, data=None)

def accept_wrapper(sock):
    conn, addr = sock.accept()  
    print(f"Accepted connection from {addr}")
    conn.setblocking(False)
    data = types.SimpleNamespace(addr=addr, inb=b"", outb=b"")
    events = selectors.EVENT_READ | selectors.EVENT_WRITE
    sel.register(conn, events, data=data)

def service_connection(key, mask):
    sock = key.fileobj
    data = key.data
    if mask & selectors.EVENT_READ:
        recv_data = sock.recv(4096) 
        if recv_data:
            data.outb += recv_data
        else:
            print(f"Closing connection to {data.addr}")
            sel.unregister(sock)
            sock.close()
    if mask & selectors.EVENT_WRITE:
        if data.outb:
            res,isHTTP = type_mensage(data.outb,backup)
            if isHTTP:
                res = json.dumps(res)
                size = len(res)
                msg = "HTTP/1.1 200 Ok\r\nContent-Type:application/json\r\nContent-Length:{}\r\n\r\n{}\r\n\r\n".format(size,res)
                data.outb = msg.encode()
                sent = sock.send(data.outb)
                data.outb = data.outb[sent:]
            else:
                data.outb = str(res).encode()
                sent = sock.send(data.outb)
                data.outb = data.outb[sent:]

            print(backup)


try:
    while True:
        events = sel.select(timeout=None)
        for key, mask in events:
            if key.data is None:
                accept_wrapper(key.fileobj)
            else:
                service_connection(key, mask)
except KeyboardInterrupt:
    print("Caught keyboard interrupt, exiting")
finally:
    sel.close()
