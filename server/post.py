
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
    size = len(result)

    if endpoint == "/spent/increase":
        if result != " " :  
            result.append(list) 
            result[size][0] = result[size][0] + result[size-1][0]
            return {"id": id, "consumption": result[size][0],  "datetime": result[size][1]}
        else:
            backup[id] = [list]
            return {"id": id, "consumption": backup[id][0][0],  "datetime": backup[id][0][1]}

    elif endpoint == "/spent/decrease":
        if result != " " :
            if list[0] > float(result[size-1][0]):
               result.append([0,list[1]])
               return {"id": id, "consumption": result[size][0],  "datetime": result[size][1]}
            else:
                result.append(list) 
                result[size][0] = result[size-1][0] - result[size][0]
                return {"id": id, "consumption": result[size][0],  "datetime": result[size][1]}
        else:
            backup[id] = [0,list[1]]
            return {"id": id, "consumption": backup[id][0][0],  "datetime": backup[id][0][1]}

    elif endpoint == "/spent":
        if result != " " :
            result.append(list) 
            return {"id": id, "consumption": result[size][0],  "datetime": result[size][1]}
        else:
            backup[id] = [list]
            return {"id": id, "consumption": backup[id][0][0],  "datetime": backup[id][0][1]}
