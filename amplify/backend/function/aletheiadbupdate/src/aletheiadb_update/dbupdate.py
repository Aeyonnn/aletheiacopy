import mysql.connector
import json

# user = 'vinceldelapena@gmail.com'

def dbUpdate(check, news_id):
  mydb = mysql.connector.connect(
  host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
  user="admin",
  password="admin123",
  database="Aletheia"
  )

  cursor = mydb.cursor()

  sql = 'UPDATE Aletheia.news_table SET check_eval = {} WHERE id_news = {};'.format(check, news_id)
  cursor.execute(sql)
  mydb.commit()

  if mydb:
    return 'Updated Successfully'
  else:
    return 'Update Failed'
  # return{
  #   'statusCode': 200,
  #   'headers': { 'Content-Type': 'application/json' },
  #   'body': json.dumps({ 'id': '{}'.format(id) })
  # }


# RETURN ID TO REACT NEEDS TO BE CATCH BY A VARIABLE