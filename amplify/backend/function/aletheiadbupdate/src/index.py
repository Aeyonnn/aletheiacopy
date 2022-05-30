import json
<<<<<<< HEAD

def handler(event, context):
  print('received event:')
  print(event)
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }
=======
from aletheiadb_update.dbupdate import dbUpdate
def handler(event, context):
  
  check = event['queryStringParameters']['admineval']
  print(check)
  news_id = event['queryStringParameters']['newsid']
  body = {
    "message": dbUpdate(check, news_id)
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
>>>>>>> 40f2a2731cea91183c31f434cbd10c7d23a5f7bb
