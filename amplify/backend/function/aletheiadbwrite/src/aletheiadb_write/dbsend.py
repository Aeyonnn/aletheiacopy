import mysql.connector
import json


def dbWrite(user, type, body, comb, eval):
    mydb = mysql.connector.connect(
    host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
    user="admin",
    password="admin123",
    database="Aletheia"
    )

    cursor = mydb.cursor()

    sql = "INSERT INTO news_table (id_user,news_type,news_body,news_pred,user_eval) VALUES (%s, %s, %s, %s, %s)"
    val = (user, type, body, comb, eval)
    cursor.execute(sql,val)
    mydb.commit()
    id = cursor.lastrowid
    if id:
        return(f'Write Success {id}')
    else:
        return('Write Fail')