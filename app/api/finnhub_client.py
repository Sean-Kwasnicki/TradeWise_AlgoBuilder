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
        print(f"Error fetching company profile for {symbol}: {e}")
        return None

# def get_financials(symbol):
#     url = f'{BASE_URL}/stock/metric?symbol={symbol}&metric=all&token={API_KEY}'
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         metrics = response.json()
#         if 'metric' in metrics:
#             return {
#                 'pe_ratio': metrics['metric'].get('peInclExtraTTM', 0),
#                 'dividend_yield': metrics['metric'].get('dividendYieldIndicatedAnnual', 0)
#             }
#         return {}
#     except Exception as e:
#         print(f"Error fetching financial metrics for {symbol}: {e}")
#         return None

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
            # 'market_cap': profile.get('market_cap', 0),
            # 'pe_ratio': financials.get('pe_ratio', 0),
            # 'dividend_yield': financials.get('dividend_yield', 0)
        }
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")  # Error handling
        return None

def get_company_news(symbol, from_date, to_date):
    url = f"{BASE_URL}/company-news?symbol={symbol}&from={from_date}&to={to_date}&token={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        news_items = response.json()
        return news_items
    except Exception as e:
        print(f"Error fetching company news for {symbol}: {e}")
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
                'week_52_low': metric.get('52WeekLow'),
                # 'average_volume': metric.get('10DayAverageTradingVolume')
            }
    except requests.exceptions.RequestException as e:
        print(f"Error fetching stock details for {symbol}: {e}")
        return None



# # Function to get historical prices including volume
# def get_historical_prices(symbol):
#     end_time = int(datetime.now().timestamp())
#     start_time = int((datetime.now() - timedelta(days=5)).timestamp())

#     url = f'https://finnhub.io/api/v1/stock/candle?symbol={symbol}&resolution=D&from={start_time}&to={end_time}&token={API_KEY}'

#     response = requests.get(url)
#     data = response.json()

#     if data and data.get('s') == 'ok':
#         historical_prices = {}
#         for i in range(len(data['t'])):
#             date = datetime.utcfromtimestamp(data['t'][i]).strftime('%Y-%m-%d')
#             historical_prices[date] = {
#                 '1. open': data['o'][i],
#                 '2. high': data['h'][i],
#                 '3. low': data['l'][i],
#                 '4. close': data['c'][i],
#             }
#         return historical_prices
#     else:
#         print("Error fetching data:", data)
#         return None


# if __name__ == "__main__":
#     symbols = ['PPL']
#     for symbol in symbols:
#         print(get_stock_price(symbol))
#         news = get_company_news(symbol, "2024-07-10", "2024-07-16")
#         print(f"News for {symbol}:")
#         for item in news:
#             print(f"{item['datetime']} - {item['headline']}")
