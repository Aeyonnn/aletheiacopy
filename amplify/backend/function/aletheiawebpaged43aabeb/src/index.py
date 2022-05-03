import json
from test.testalgo import lambdaGet

def handler(event, context):
  data = event['news']
  body = {
    # "message": "Hello from Lambda!"
    "news": data,
    "message": str(lambdaGet(data))
  }

  response = {
    "statusCode": 200,
    "body": json.dumps(body),
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  }
  
  return response
# print(str(lambdaGet()))