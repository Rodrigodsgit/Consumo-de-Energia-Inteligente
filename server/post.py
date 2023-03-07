
import json

def data_spent(body):
    consumption = body.get("consumption")
    date = body.get("datetime")
    consumption = float(consumption)
    return [consumption, date]

def post(data,endpoint, isHttp, backup):
    if isHttp:
        body = json.loads(data[11])
    else:
        body = data
    id = body.get("id")
    result = backup.get(id," ")
    list = data_spent(body)

    if endpoint == "/spent":
        if result != " " :
            list[0] += result[-1][0]
            result.append(list) 
            return {"id": id, "consumption": result[-1][0],  "datetime": result[-1][1]}
        else:
            backup[id] = [list]
            return {"id": id, "consumption": backup[id][0][0],  "datetime": backup[id][0][1]}

