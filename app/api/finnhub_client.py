import os
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('FINNHUB_API_KEY')
BASE_URL = 'https://finnhub.io/api/v1'

def get_company_profile(symbol):
    url = f'{BASE_URL}/stock/profile2?symbol={symbol}&token={API_KEY}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        profile = response.json()
        return {
            'name': profile.get('name', symbol),
            # 'market_cap': profile.get('marketCapitalization', 0)
        }
    except Exception as e:
        return None


def get_stock_price(symbol):
    url = f'{BASE_URL}/quote?symbol={symbol}&token={API_KEY}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        stock_info = response.json()
        profile = get_company_profile(symbol)
        # financials = get_financials(symbol)
        return {
            'symbol': symbol,
            'price': stock_info.get('c', 0),
            'name': profile.get('name', symbol),
        }
    except Exception as e:
        return None

def get_company_news(symbol, from_date, to_date):
    url = f"{BASE_URL}/company-news?symbol={symbol}&from={from_date}&to={to_date}&token={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        news_items = response.json()
        return news_items
    except Exception as e:
        return None


def get_stock_details(symbol):
    url = f"{BASE_URL}/stock/metric?symbol={symbol}&metric=all&token={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        metric = data.get('metric')
        if metric:
            return {
                'week_52_high': metric.get('52WeekHigh'),
                'week_52_low': metric.get('52WeekLow')
            }
    except requests.exceptions.RequestException as e:
        return None
