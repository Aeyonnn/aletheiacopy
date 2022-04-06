import json

def handler(event, context):
  body = {
    "message": "Hello from Lambda!"
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