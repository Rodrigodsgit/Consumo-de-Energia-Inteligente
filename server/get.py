from utils import alert

def get(endpoint, backup):

    endpoint = endpoint.split("/")
    if endpoint[1] == "historic":
        for key, value in backup.items():
            if key == endpoint[2]:
                res = alert({},value)
                res.update({key:value})
                return res