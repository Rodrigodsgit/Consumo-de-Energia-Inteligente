from utils import alert

def get(endpoint, backup):

    endpoint = endpoint.split("/")
    if endpoint[1] == "historic":
        historic = backup.get(endpoint[2]," ")
        if historic != " ":
            res = alert({},historic)
            res.update({"historic":historic})
            return res
        else:
            return None
    elif endpoint[1] == "invoice":
        historic = backup.get(endpoint[2]," ")
        if historic != " ":
            res = alert({},historic)
            spent = historic[-1][0]
            value = round((spent * 0.4),2)
            res.update({"invoice":value})
            return res
        else:
            return None
    
    elif endpoint[1] == "measurer":
       if backup.get(endpoint[2]):
           return True
       else: 
           return False
