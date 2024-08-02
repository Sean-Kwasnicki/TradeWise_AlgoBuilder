# from ib_insync import *
# import pandas as pd

# # SMA 20 crossing SMA 50 this works and sets a buy order
# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract (e.g., AAPL stock)
# contract = Stock('AAPL', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 D',
#     barSizeSetting='5 mins',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1)

# # Convert to DataFrame
# df = util.df(bars)

# # Calculate the simple moving averages
# df['SMA20'] = df['close'].rolling(window=20).mean()
# df['SMA50'] = df['close'].rolling(window=50).mean()

# # Define the trading logic
# position = 0  # 0 means no position, 1 means long position

# for i in range(1, len(df)):
#     if df['SMA20'][i] > df['SMA50'][i] and df['SMA20'][i-1] <= df['SMA50'][i-1]:
#         if position == 0:
#             # Buy signal
#             buy_order = LimitOrder('BUY', 10, df['close'][i])
#             trade = ib.placeOrder(contract, buy_order)
#             print(f"Buy Order Status: {trade.orderStatus.status}")
#             position = 1
#     elif df['SMA20'][i] < df['SMA50'][i] and df['SMA20'][i-1] >= df['SMA50'][i-1]:
#         if position == 1:
#             # Sell signal
#             sell_order = LimitOrder('SELL', 10, df['close'][i])
#             trade = ib.placeOrder(contract, sell_order)
#             print(f"Sell Order Status: {trade.orderStatus.status}")
#             position = 0

# # Keep the script running to receive updates
# ib.run()
