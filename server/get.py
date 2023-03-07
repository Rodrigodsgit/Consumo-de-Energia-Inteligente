def get(endpoint, backup):

    endpoint = endpoint.split("/")
    if endpoint[1] == "historic":
        for key, value in backup.items():
            if key == endpoint[2]:
                historic = {}
                historic[key] = value
                return historic