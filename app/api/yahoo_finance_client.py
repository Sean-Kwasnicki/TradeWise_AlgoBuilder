import os
from datetime import datetime, timedelta
import requests
import yfinance as yf
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
BASE_URL = 'https://www.alphavantage.co/query'

def get_stock_price(symbol):
    try:
        stock = yf.Ticker(symbol)
        stock_info = stock.info
        print(f"Fetched data for {symbol}: {stock_info}")  # Debug print statement
        return {
            'symbol': symbol,
            'price': stock_info.get('bid', 0),
            'name': stock_info.get('longName', symbol),  # Fetches the full name of the stock
            'market_cap': stock_info.get('marketCap', 0),
            'pe_ratio': stock_info.get('trailingPE', 0),
            'dividend_yield': stock_info.get('dividendYield', 0)
        }
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")  # Error handling
        return None

# Test the function
if __name__ == "__main__":
    symbols = ['AAPL', 'GOOGL', 'MSFT']
    for symbol in symbols:
        print(get_stock_price(symbol))


def get_historical_prices(symbol):
    stock = yf.Ticker(symbol)
    end_date = datetime.now()
    start_date = end_date - timedelta(days=5)
    historical_data = stock.history(start=start_date, end=end_date)
    historical_prices = historical_data.to_dict('index')
    formatted_data = {}

    for date, data in historical_prices.items():
        formatted_data[date.strftime('%Y-%m-%d')] = {
            '1. open': data['Open'],
            '4. close': data['Close'],
            '2. high': data['High'],
            '3. low': data['Low'],
            '5. volume': data['Volume']
        }

    return formatted_data
