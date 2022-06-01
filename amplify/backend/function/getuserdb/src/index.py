import json
from userdb.getuserdb import getUserDb

def handler(event, context):
  user_id = event['queryStringParameters']['user']
  body = {
    "UserDataBase": getUserDb(user_id)
  }
  response = {
    "statusCode": 200,
    "body": json.dumps(body),
    "headers": {
          "Content-Type": "application/json",
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
  }
  return response