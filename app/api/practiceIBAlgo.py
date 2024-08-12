
# # Bollinger Bands Strategy
# # This strategy uses Bollinger Bands to generate buy and sell signals.

# from ib_insync import *
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)
# print(f"Connected to Interactive Broker")

# # Define the contract
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
# df['SMA20'] = df['close'].rolling(window=20).mean()
# df['UpperBand'] = df['SMA20'] + (2 * df['close'].rolling(window=20).std())
# df['LowerBand'] = df['SMA20'] - (2 * df['close'].rolling(window=20).std())

# # Define the trading logic
# position = 0  # 0 means no position, 1 means long position

# for i in range(1, len(df)):
#     if df['close'][i] < df['LowerBand'][i] and position == 0:
#         # Buy signal
#         buy_order = LimitOrder('BUY', 10, df['close'][i])
#         trade = ib.placeOrder(contract, buy_order)
#         # print(f"Buy Order Status: {trade.orderStatus.status}")
#         position = 1
#     elif df['close'][i] > df['UpperBand'][i] and position == 1:
#         # Sell signal
#         sell_order = LimitOrder('SELL', 10, df['close'][i])
#         trade = ib.placeOrder(contract, sell_order)
#         # print(f"Sell Order Status: {trade.orderStatus.status}")
#         position = 0

# # Keep the script running to receive updates
# print(f"Running Bollinger Bands Strategy Script")
# ib.run()
