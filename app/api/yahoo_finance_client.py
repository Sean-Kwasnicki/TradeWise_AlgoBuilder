import os
from datetime import datetime, timedelta
import requests
import yfinance as yf
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
BASE_URL = 'https://www.alphavantage.co/query'

def get_historical_prices(symbol):
    stock = yf.Ticker(symbol)
    end_date = datetime.now()
    start_date = end_date - timedelta(days=5)
    historical_data = stock.history(start=start_date, end=end_date)

    # Convert the index to datetime format without timezone
    historical_data.index = pd.to_datetime(historical_data.index).date

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

def get_stock_details(symbol):
    try:
        stock = yf.TTicker(symbol)
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
