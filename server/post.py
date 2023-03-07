
import json
from datetime import datetime

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
    

    if endpoint == "/spent":
        list = data_spent(body)
        if result != " " :
            list[0] += result[-1][0]
            result.append(list) 
            return {"id": id, "consumption": result[-1][0],  "datetime": result[-1][1]}
        else:
            backup[id] = [list]
            return {"id": id, "consumption": backup[id][0][0],  "datetime": backup[id][0][1]}
    elif endpoint == "/historic":
        if result != " " :
            filteredDate = []
            dateLimit = datetime.strptime(body.get("datetime"), '%Y-%m-%d %H:%M:%S')
            for date in result:
                if datetime.strptime(date[1], '%Y-%m-%d %H:%M:%S') < dateLimit:
                    filteredDate.append(date)
            return filteredDate
        else:
            return None