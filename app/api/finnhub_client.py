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
            'market_cap': profile.get('marketCapitalization', 0)
        }
    except Exception as e:
        print(f"Error fetching company profile for {symbol}: {e}")
        return None

def get_financials(symbol):
    url = f'{BASE_URL}/stock/metric?symbol={symbol}&metric=all&token={API_KEY}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        metrics = response.json()
        if 'metric' in metrics:
            return {
                'pe_ratio': metrics['metric'].get('peInclExtraTTM', 0),
                'dividend_yield': metrics['metric'].get('dividendYieldIndicatedAnnual', 0)
            }
        return {}
    except Exception as e:
        print(f"Error fetching financial metrics for {symbol}: {e}")
        return None

def get_stock_price(symbol):
    url = f'{BASE_URL}/quote?symbol={symbol}&token={API_KEY}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        stock_info = response.json()
        profile = get_company_profile(symbol)
        financials = get_financials(symbol)
        return {
            'symbol': symbol,
            'price': stock_info.get('c', 0),  # Current price
            'name': profile.get('name', symbol),  # Company name
            'market_cap': profile.get('market_cap', 0),  # Market cap
            'pe_ratio': financials.get('pe_ratio', 0),  # PE ratio
            'dividend_yield': financials.get('dividend_yield', 0)  # Dividend yield
        }
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")  # Error handling
        return None



if __name__ == "__main__":
    symbols = ['AAPL', 'GOOGL', 'MSFT']
    for symbol in symbols:
        print(get_stock_price(symbol))
