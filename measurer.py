import json
import socket
import datetime


sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(("127.0.0.1", 4005))


def get_id():
    dicio = {"id": 0}
    dicio = json.dumps(dicio)
    sock.send(dicio.encode())
    return sock.recv(4096)


def send_data(consumption, typeSpent):

    current_date_time = datetime.datetime.now()
    current_date_time = str(current_date_time)

    dicio = {"id": id, "consumption": consumption,
             "datetime": current_date_time, "type": typeSpent}
    print(dicio)
    dicio = json.dumps(dicio)
    sock.send(dicio.encode())
    response = sock.recv(4096)
    if response.decode() != None:
        print("Change made successfully")
    else:
        print("Unable to make changes, please try again")


id = get_id().decode()

while True:
    print("=== Which of the meter management options do you want to perform? ===")
    print("== 1 - Increases consumption in kWh\n== 2 - Decrease consumption in kWh\n== 3 - Set consumptino in kWh\n== 4 - Leave the program\n===:")
    option = input()

    if option == "1":
        increaseValor = input("Enter the amount you want to increase in kWh:")
        send_data(increaseValor, "/spent/increase")

    elif option == "2":
        decreaseValor = input("Enter the amount you want to decrease in kWh:")
        send_data(decreaseValor, "/spent/decrease")

    elif option == "3":
        setValor = input("Enter the amount you want to set in kWh:")
        send_data(setValor, "/spent")

    elif option == "4":
        print("Finishing the program")
        break
    else:
        print("Incorrect option")

sock.close()
