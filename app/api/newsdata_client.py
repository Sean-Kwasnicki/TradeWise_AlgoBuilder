import os
from newsdataapi import NewsDataApiClient
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
api = NewsDataApiClient(apikey='pub_3448302204e26f6fb35ea5a80f8c03de5682a')

def get_news_by_company_name(company_name):
    response = api.news_api(q=company_name, language="en")
    if response and 'results' in response:
        return response['results']
    else:
        return None
