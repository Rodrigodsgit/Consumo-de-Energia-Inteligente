import json
import socket
import datetime
import time 
import threading

# IP Fisico 172.16.103.211

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("127.0.0.1", 4005))
base,rate = 1.0,1.0
spent = 0

def get_id():
    dicio = {"id": 0}
    dicio = json.dumps(dicio)
    sock.send(dicio.encode())
    return sock.recv(4096)

def send_data():
    try:
        global spent
        while True:
            time.sleep(1)
            send = base * rate
            spent += send
            current_date_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            current_date_time = str(current_date_time)

            dicio = {"id": id, "consumption": spent,
                    "datetime": current_date_time, "type": "/spent"}
            dicio = json.dumps(dicio)
            sock.send(dicio.encode())
            response = sock.recv(4096)
            if response.decode() != None:
                pass
            else:
                print("Unable to make changes, please try again")
                break
        sock.close()  
                
    except:
         pass
         

def menu():
    try:
        global rate 
        while True:
            print("=== Which of the meter management options do you want to perform? ===")
            print("== 1 - Increase the consumption rate in KWh\n== 2 - Decrease the consumption rate in kWh\n== 3 - Set the consumption rate in kWh\n== 4 - Leave the program")
            option = input()

            if option == "1":
                rate += float(input("Enter how much you want to increase the rate:"))
                
            elif option == "2":
                rate -= float(input("Enter how much you want to decrease the rate:"))
                if rate < 0:
                    rate = 0
                
            elif option == "3":
                rate = float(input("Enter the new rate amount:"))
                if rate < 0:
                    rate = 0
                
            elif option == "4":
                print("Finishing the program")
                break
            else:
                print("Incorrect option")

        sock.close()
    except KeyboardInterrupt:
        sock.close()  

print("Meter initialization, please wait...")
time.sleep(3)
id = get_id().decode()
t1 = threading.Thread(target=send_data)
t2 = threading.Thread(target=menu)

t1.start()
t2.start()

t1.join()
t2.join()





