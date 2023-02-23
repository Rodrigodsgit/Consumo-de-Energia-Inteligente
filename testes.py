import socket

HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 4001  # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = conn.recv(1024)
            if not data:
                break
            msg = "HTTP/1.1 200 Ok\r\nContent-Type:application/json\r\nContent-Length:15\r\n\r\n{'id':'id'}\r\n\r\n"
            conn.sendall(msg.encode())