
import json
from datetime import datetime
from utils import alert

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
        res = alert({},result)
        list = data_spent(body)
        if result != " " :
            result.append(list)
            res.update({"id": id, "consumption": result[-1][0],  "datetime": result[-1][1]})
            return res
        else:
            backup[id] = [list]
            res.update( {"id": id, "consumption": backup[id][0][0],  "datetime": backup[id][0][1]})
            return res
        
    elif endpoint == "/historic":
        res = alert({},result)
        if result != " " :
            filteredDate = []
            dateLimit = datetime.strptime(body.get("datetime"), '%Y-%m-%d %H:%M:%S')
            for date in result:
                if datetime.strptime(date[1], '%Y-%m-%d %H:%M:%S') == dateLimit:
                    filteredDate.append(date)
            res.update({"historic": filteredDate})
            return res
        else:
            return None
        
    elif endpoint == "/historic/upper":
        res = alert({},result)
        if result != " " :
            filteredDate = []
            dateLimit = datetime.strptime(body.get("datetime"), '%Y-%m-%d %H:%M:%S')
            for date in result:
                if datetime.strptime(date[1], '%Y-%m-%d %H:%M:%S') >= dateLimit:
                    filteredDate.append(date)
            res.update({"historic": filteredDate})
            return res
        else:
            return None
        
    elif endpoint == "/historic/lower":
        res = alert({},result)
        if result != " " :
            filteredDate = []
            dateLimit = datetime.strptime(body.get("datetime"), '%Y-%m-%d %H:%M:%S')
            for date in result:
                if datetime.strptime(date[1], '%Y-%m-%d %H:%M:%S') <= dateLimit:
                    filteredDate.append(date)
            res.update({"historic": filteredDate})
            return res
        else:
            return None
    