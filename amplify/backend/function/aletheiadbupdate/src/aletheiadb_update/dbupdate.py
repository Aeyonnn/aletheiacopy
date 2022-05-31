import mysql.connector
import json

def dbUpdate(check, news_id):
  mydb = mysql.connector.connect(
  host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
  user="admin",
  password="admin123",
  database="Aletheia"
  )

  cursor = mydb.cursor()

  sql = 'UPDATE Aletheia.news_table SET check_eval = %s WHERE id_news = %s;'
  val = (check, news_id)
  cursor.execute(sql, val)
  mydb.commit()

  if mydb:
    return 'Updated Successfully'
  else:
    return 'Update Failed'