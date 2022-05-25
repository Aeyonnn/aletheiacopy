import mysql.connector
import json

# user = 'vinceldelapena@gmail.com'

def connectUser(email):
  mydb = mysql.connector.connect(
  host="database-1.cyqaefb6grs6.ap-southeast-1.rds.amazonaws.com",
  user="admin",
  password="admin123",
  database="Aletheia"
  )

  cursor = mydb.cursor()

  cursor.execute("SELECT * FROM account WHERE username=%s",(email,))
  data="error" #initially just assign the value
  for i in cursor:
      data=i 
  if data=="error":
      print("User Does not exist")
      sql = "INSERT INTO account (username) VALUES (%s)"
      val = (email,)
      cursor.execute(sql, val)
      mydb.commit()
      id = cursor.lastrowid
      print (id)
  else:
      id = data[0]
      print(f'user exist and id is: {id}')
  
  return id
  # return{
  #   'statusCode': 200,
  #   'headers': { 'Content-Type': 'application/json' },
  #   'body': json.dumps({ 'id': '{}'.format(id) })
  # }


# RETURN ID TO REACT NEEDS TO BE CATCH BY A VARIABLE