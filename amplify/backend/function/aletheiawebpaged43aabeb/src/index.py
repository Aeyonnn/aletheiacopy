import json
from test.testalgo import combiModel, neuralModel, decisionModel, randomModel

def handler(event, context):
  data = event['queryStringParameters']['news']
  print(data)
  body = {
    "news": data,
    "combination": str(combiModel(data)),
    "neural": str(neuralModel(data)),
    "decision": str(decisionModel(data)),
    "randomf": str(randomModel(data))
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