import mysql.connector
import json

def getSummary(user_id):
    data = ()
    mydb = mysql.connector.connect(
    host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
    user="admin",
    password="admin123",
    database="Aletheia"
    )

    cursor = mydb.cursor()
    if (user_id == '1' or user_id == '2' or user_id == '3'):
        cursor.execute("SELECT news_pred, user_eval, COUNT(*) FROM news_table GROUP BY news_pred, user_eval")
        myresult = cursor.fetchall()
        for x in myresult:
            data = myresult
        info = json.dumps(data)
        return data
    else:
        return 'NO DATA'
