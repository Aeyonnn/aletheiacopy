import json
from universal_scraper.scraper import get_page_text
import boto3 
def handler(event, context):
  news_scrape = event['news']
  print('received event:')
  print(news_scrape)

  print(get_page_text(news_scrape))
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }