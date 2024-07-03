import os
from datetime import datetime, timedelta
import requests
import yfinance as yf
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
BASE_URL = 'https://www.alphavantage.co/query'

# def get_historical_prices(symbol):
#     stock = yf.Ticker(symbol)
#     end_date = datetime.now()
#     start_date = end_date - timedelta(days=5)
#     historical_data = stock.history(start=start_date, end=end_date)
#     historical_prices = historical_data.to_dict('index')
#     formatted_data = {}

#     for date, data in historical_prices.items():
#         formatted_data[date.strftime('%Y-%m-%d')] = {
#             '1. open': data['Open'],
#             '4. close': data['Close'],
#             '2. high': data['High'],
#             '3. low': data['Low'],
#             '5. volume': data['Volume']
#         }

#     return formatted_data

def get_historical_prices(symbol):
    stock = yf.Ticker(symbol)
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')

    try:
        historical_data = stock.history(start=start_date, end=end_date)
        if not historical_data.empty:
            historical_data.index = pd.to_datetime(historical_data.index)
            if hasattr(historical_data.index, 'tz_localize'):
                historical_data.index = historical_data.index.tz_localize("UTC").tz_convert("America/New_York")

            prices = historical_data['Close'].tolist()
            dates = historical_data.index.strftime('%Y-%m-%d').tolist()
            return [{'date': date, 'close_price': price} for date, price in zip(dates, prices)]
        else:
            print(f"No historical data found for {symbol}")
            return None
    except Exception as e:
        print(f"Error fetching historical prices for {symbol}: {e}")
        return None

def get_stock_details(symbol):
    try:
        stock = yf.Ticker(symbol)
        info = stock.info

        details = {
            'volume': info.get('volume'),
            'week_52_high': info.get('fiftyTwoWeekHigh'),
            'week_52_low': info.get('fiftyTwoWeekLow'),
            'average_volume': info.get('averageVolume')
        }

        return details
    except Exception as e:
        print(f"Error fetching stock details for {symbol}: {e}")
        return None
