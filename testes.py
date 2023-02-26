import socket
import time
import datetime
import json

data_hora_atual = datetime.datetime.now()
data_hora_atual = str(data_hora_atual)

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("127.0.0.1", 4005))

for i in range(7):
    time.sleep(3)
    dicio = {"id":"2", "consumption": "10", "datetime":data_hora_atual} 
    dicio = json.dumps(dicio)

    mensagem = "POST /spent/increase HTTP/1.1\r\nContent-Type: application/json\r\nUser-Agent:Medidor\r\n Accpet:*/*\r\nCache-Control: no-cache\r\nMedidor-Token:None\r\nHost:127.0.0.1:4001\r\nAccept-Encoding:gzip, deflate, br\r\nConnection:keep-alive\r\nContent-Length:48\r\n\r\n{}\r\n\r\n".format(dicio)

    sock.send(mensagem.encode())


    #sock.send(b'GET /pools HTTP/1.1\r\nUser-Agent:Medidor\r\n Accpet:*/*\r\nCache-Control: no-cache\r\nMedidor-Token:None\r\nHost:127.0.0.1:4001\r\nAccept-Encoding:gzip, deflate, br\r\nConnection:keep-alive\r\n\r\n')

    response = sock.recv(4096)
    print(response.decode())
sock.close()


