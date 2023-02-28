import socket

HOST = "127.0.0.1"  # Endereço IP do servidor
PORT = 4005  # Porta de comunicação

# Cria o socket TCP
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Liga o socket à porta escolhida
sock.bind((HOST, PORT))

# Escuta por conexões de entrada
sock.listen()

# Aguarda por uma conexão
conn, addr = sock.accept()
print('Conexão estabelecida com', addr)