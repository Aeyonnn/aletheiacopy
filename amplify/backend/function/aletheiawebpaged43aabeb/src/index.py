import json
from test.testalgo import combiModel, neuralModel, decisionModel, randomModel

def handler(event, context):
  data = event['queryStringParameters']['news']
  print(data)

  combi =  str(combiModel(data))
  neural = str(neuralModel(data))
  decision = str(decisionModel(data))
  randomf = str(randomModel(data))

  if combi == "['REAL']" :
        combi = 'REAL'
  else:
        combi = 'FAKE'

  if neural == "['REAL']" :
        neural = 'REAL'
  else:
        neural = 'FAKE'

  if decision == "['REAL']" :
        decision = 'REAL'
  else:
        decision = 'FAKE'

  if randomf == "['REAL']" :
        randomf = 'REAL'
  else:
        randomf = 'FAKE'

  body = {
    "news": data,
    "combination": combi,
    "neural": neural,
    "decision": decision,
    "randomf": randomf
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