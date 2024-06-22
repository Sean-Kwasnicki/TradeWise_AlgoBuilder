import os
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv


load_dotenv()

API_KEY = os.getenv('FINNHUB_API_KEY')
BASE_URL = 'https://finnhub.io/api/v1'

def get_stock_price(symbol):
    url = f'{BASE_URL}/quote?symbol={symbol}&token={API_KEY}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        stock_info = response.json()
        print(f"Fetched data for {symbol}: {stock_info}")  # Debug print statement
        return {
            'symbol': symbol,
            'price': stock_info.get('c', 0),  # Current price
            'name': symbol,  # Placeholder, as Finnhub does not provide company name in quote endpoint
            'market_cap': 0,  # Placeholder, as Finnhub does not provide market cap in quote endpoint
            'pe_ratio': 0,  # Placeholder, as Finnhub does not provide PE ratio in quote endpoint
            'dividend_yield': 0  # Placeholder, as Finnhub does not provide dividend yield in quote endpoint
        }
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")  # Error handling
        return None

def get_historical_prices(symbol):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=5)
    end_timestamp = int(end_date.timestamp())
    start_timestamp = int(start_date.timestamp())

    url = f'{BASE_URL}/stock/candle?symbol={symbol}&resolution=D&from={start_timestamp}&to={end_timestamp}&token={API_KEY}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if data['s'] != 'ok':
            raise Exception("Error fetching historical data")

        historical_prices = {}
        for i in range(len(data['t'])):
            date = datetime.fromtimestamp(data['t'][i]).strftime('%Y-%m-%d')
            historical_prices[date] = {
                '1. open': data['o'][i],
                '4. close': data['c'][i],
                '2. high': data['h'][i],
                '3. low': data['l'][i],
                '5. volume': data['v'][i]
            }

        return historical_prices
    except Exception as e:
        print(f"Error fetching historical data for {symbol}: {e}")
        return None

# Test the functions
if __name__ == "__main__":
    symbols = ['AAPL', 'GOOGL', 'MSFT']
    for symbol in symbols:
        print(get_stock_price(symbol))
        print(get_historical_prices(symbol))
