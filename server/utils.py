

def alert(res,result):
    if result[-1][0] != ' ':
        if int(result[-1][0]) >= 300:
            res["alert"] = "Your energy consumption is above the recommended"
            
        else:
            res["alert"] = "Your energy consumption is within the recommended"
        
    else:
        res["alert"] = "Your energy consumption is above the recommended"

    return res