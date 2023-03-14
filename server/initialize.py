import socket
import selectors
import types
import json


from get import get
from post import post

print(socket.gethostbyname(socket.gethostname()))

# IPDocker 172.17.0.2

HOST = "127.0.0.1"  
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
                print(res)
                res = json.dumps(res)
                size = len(res)
                msg = "HTTP/1.1 200 Ok\r\nContent-Type:application/json\r\nContent-Length:{}\r\nAccess-Control-Allow-Origin: *\r\n\r\n{}\r\n\r\n".format(size,res)
                data.outb = msg.encode()
                sent = sock.send(data.outb)
                data.outb = data.outb[sent:]
            else:
                data.outb = str(res).encode()
                sent = sock.send(data.outb)
                data.outb = data.outb[sent:]

            print(backup)

def type_mensage(data,backup):
    dataProcess = data.decode()
    dataProcess = dataProcess.split("\r\n")
    request = dataProcess[0].split(" ")

    if request[0] == "GET":
        return get(request[1], backup), True
    elif request[0] == "POST":
        return post(dataProcess, request[1], True, backup), True
    elif request[0] == "PUT":
        print("==========PUT============")
    elif request[0] == "DELETE":
        print("==========DELETE============")
    else:
        body = eval(data)
        if body.get("id") == 0:
            if backup:
                return (int(list(backup.keys())[-1]) +1), False
            else:
                return 1, False
        return post(body,body.get("type"), False, backup), False



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
