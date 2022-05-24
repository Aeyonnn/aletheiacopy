import json
from database_connection.check import connectUser
def handler(event, context):
  email = event['queryStringParameters']['user']
  body = {
    "user_id": connectUser(email)
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
# print(str(lambdaGet()))