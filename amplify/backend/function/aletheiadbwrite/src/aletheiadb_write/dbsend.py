import mysql.connector
import json
import datetime
import dateutil.tz

def dbWrite(user, type, body, comb, eval):
    eastern = dateutil.tz.gettz('Asia/Shanghai')
    now = datetime.datetime.now(tz=eastern)
    datenow = now.strftime("%m/%d/%Y")
    mydb = mysql.connector.connect(
    host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
    user="admin",
    password="admin123",
    database="Aletheia"
    )

    cursor = mydb.cursor()

    sql = "INSERT INTO news_table (id_user,news_type,news_body,news_pred,user_eval,date_submitted) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (user, type, body, comb, eval, datenow)
    cursor.execute(sql,val)
    mydb.commit()
    id = cursor.lastrowid
    if id:
        return(f'Write Success {id}')
    else:
        return('Write Fail')