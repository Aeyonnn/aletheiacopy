import json
from aletheiagethistory.dbhistory import getHistory
def handler(event, context):
  user_id = event['queryStringParameters']['user']
  body = {
    "inputHistory": getHistory(user_id)
  }
  response = {
    "statusCode": 200,
    "body": json.dumps(body,default=str),
    "headers": {
          "Content-Type": "application/json",
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }
  }
  return response
# print(str(lambdaGet()))