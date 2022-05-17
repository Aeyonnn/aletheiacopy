import json
from urllib import response
from universal_scraper.scraper import get_page_text
import boto3 
def handler(event, context):
  news_scrape = event['queryStringParameters']['newslink']
  body = {
    "news": news_scrape,
    "newsart": get_page_text(news_scrape)
  }

  response = {
    'statusCode': 200,
    'body': json.dumps(body),
    'headers': {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      }
  }
  
  return response