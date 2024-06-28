import requests
from datetime import datetime, timedelta

def get_historical_prices(symbol):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=5)
    start_str = start_date.strftime('%Y-%m-%d')
    end_str = end_date.strftime('%Y-%m-%d')

    # Yahoo Finance API URL for historical data
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?period1={int(start_date.timestamp())}&period2={int(end_date.timestamp())}&interval=1d"

    response = requests.get(url)
    data = response.json()

    if "chart" not in data or "result" not in data["chart"] or len(data["chart"]["result"]) == 0:
        return {}

    result = data["chart"]["result"][0]
    timestamps = result["timestamp"]
    indicators = result["indicators"]["quote"][0]

    historical_prices = {}

    for i in range(len(timestamps)):
        date_str = datetime.fromtimestamp(timestamps[i]).strftime('%Y-%m-%d')
        historical_prices[date_str] = {
            '1. open': indicators['open'][i],
            '2. high': indicators['high'][i],
            '3. low': indicators['low'][i],
            '4. close': indicators['close'][i],
            '5. volume': indicators['volume'][i]
        }

    return historical_prices

def get_stock_details(symbol):
    url = f"https://query1.finance.yahoo.com/v10/finance/quoteSummary/{symbol}?modules=summaryDetail"
    response = requests.get(url)
    data = response.json()

    if "quoteSummary" not in data or "result" not in data["quoteSummary"] or len(data["quoteSummary"]["result"]) == 0:
        return None

    summary_detail = data["quoteSummary"]["result"][0]["summaryDetail"]

    details = {
        'volume': summary_detail.get('volume', {}).get('raw'),
        'week_52_high': summary_detail.get('fiftyTwoWeekHigh', {}).get('raw'),
        'week_52_low': summary_detail.get('fiftyTwoWeekLow', {}).get('raw'),
        'average_volume': summary_detail.get('averageVolume', {}).get('raw')
    }

    return details
