import mysql.connector
import json

def getHistory(user_id):
    data = ()
    mydb = mysql.connector.connect(
    host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
    user="admin",
    password="admin123",
    database="Aletheia"
    )

    cursor = mydb.cursor()
    if (user_id == '1' or user_id == '2' or user_id == '3'):
        cursor.execute("SELECT * FROM news_table ORDER BY id_news DESC")
        # return my result its a list or dictionary pa check nalang
        myresult = cursor.fetchall()
        for x in myresult:
            data = myresult
        # info = json.dumps(data)
        return data
    else:
        cursor.execute("SELECT * FROM news_table WHERE id_user={} ORDER BY id_news DESC".format(user_id))
        # return my result its a list or dictionary pa check nalang
        myresult = cursor.fetchall()
        for x in myresult:
            data = myresult
        # info = json.dumps(data)
        # return info
        return data