import socket
import selectors
import types
import json

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

def type_mensage(data):
    dataProcess = data.decode()
    dataProcess = dataProcess.split("\r\n")
    request = dataProcess[0].split(" ")

    if request[0] == "GET":
        get(dataProcess)
    elif request[0] == "POST":
        return post(dataProcess, request[1], True), True
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
        return post(body,body.get("type"), False), False

def data_spent(body):
    consumption = body.get("consumption")
    date = body.get("datetime")
    consumption = float(consumption)
    return [consumption, date]

def get(data):
    print(data)

def post(data,endpoint, isHttp):
    if isHttp:
        body = json.loads(data[11])
    else:
        body = data
    id = body.get("id")
    result = backup.get(id," ")
    list = data_spent(body)
    size = len(result)

    if endpoint == "/spent/increase":
        if result != " " :  
            result.append(list) 
            result[size][0] = result[size][0] + result[size-1][0]
            return result[size]
        else:
            backup[id] = [list]
            return backup[id][0]

    elif endpoint == "/spent/decrease":
        if result != " " :
            if list[0] > float(result[size-1][0]):
               result.append([0,list[1]])
               return result[size]
            else:
                result.append(list) 
                result[size][0] = result[size-1][0] - result[size][0]
                return result[size]
        else:
            backup[id] = [0,list[1]]
            return backup[id][0]

    elif endpoint == "/spent":
        if result != " " :
            result.append(list) 
            return result[size]
        else:
            backup[id] = [list]
            return backup[id][0]

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
            res,isHTTP = type_mensage(data.outb)
            if isHTTP:
                size = length(res)
                msg = "HTTP/1.1 200 Ok\r\nContent-Type:application/json\r\nContent-Length:{}\r\n\r\n{}\r\n\r\n".format(size,res)
                data.outb = msg.encode()
                sent = sock.send(data.outb)
                data.outb = data.outb[sent:]
            else:
                data.outb = str(res).encode()
                sent = sock.send(data.outb)
                data.outb = data.outb[sent:]

            print(backup)


def length(list):
    count = 0
    for i in list:
        count = count + len(str(i))
    return count + 10

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
