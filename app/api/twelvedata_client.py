import os
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

TWELVE_DATA_API_KEY = os.getenv('TWELVE_DATA_API_KEY')

def get_historical_prices_twelvedata(symbol):
    base_url = 'https://api.twelvedata.com/time_series'
    end_date = datetime.now().strftime('%Y-%m-%d')
    start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')

    params = {
        'symbol': symbol,
        'interval': '1day',
        'start_date': start_date,
        'end_date': end_date,
        'apikey': '33695a3505064f6f85348c917a26ffaf'
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    if 'values' in data:
        last_year_data = data['values'][-1]
        historical_prices = {
            'date': last_year_data['datetime'],
            'close_price': last_year_data['close']
        }
        return historical_prices
    else:
        print(f"Error fetching data: {data}")
        return None

# Testing the function
if __name__ == "__main__":
    symbol = 'AAPL'
    historical_prices = get_historical_prices_twelvedata(symbol)
    print(historical_prices)
