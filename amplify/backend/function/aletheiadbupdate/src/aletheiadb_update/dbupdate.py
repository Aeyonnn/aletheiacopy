import mysql.connector
import json
import datetime
import dateutil.tz

def dbUpdate(check, news_id):
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

  sql = 'UPDATE Aletheia.news_table SET check_eval = %s, date_checked = %s WHERE id_news = %s;'
  val = (check, datenow, news_id)
  cursor.execute(sql, val)
  mydb.commit()

  if mydb:
    return 'Updated Successfully'
  else:
    return 'Update Failed'