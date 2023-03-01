from post import post
from get import get


def type_mensage(data,backup):
    dataProcess = data.decode()
    dataProcess = dataProcess.split("\r\n")
    request = dataProcess[0].split(" ")

    if request[0] == "GET":
        get(dataProcess)
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
        return post(body,body.get("type"), False), False

