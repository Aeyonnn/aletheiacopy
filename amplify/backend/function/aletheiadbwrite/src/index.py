import json
from aletheiadb_write.dbsend import dbWrite
def handler(event, context):
  user_id = event['queryStringParameters']['user']
  type = event['queryStringParameters']['ntype']
  newsbody = event['queryStringParameters']['nbody']
  comb = event['queryStringParameters']['alcomb']
  eval = event['queryStringParameters']['usereval']
  body = {
    "dbwritecheck": dbWrite(user_id, type, newsbody, comb, eval)
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