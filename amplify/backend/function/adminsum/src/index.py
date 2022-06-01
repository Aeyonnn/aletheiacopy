import json
from adminsummary.adminsum import getSummary
def handler(event, context):
  user_id = event['queryStringParameters']['user']
  body = {
    "summarystat": getSummary(user_id)
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