
# # Moving Average Convergence Divergence (MACD) Strategy
# # This strategy uses the crossover of the MACD and Signal line to generate buy and sell signals.

# from ib_insync import *
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)
# print(f"Connected to Interactive Broker")

# # Define the contract
# contract = Stock('T', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 D',
#     barSizeSetting='15 mins',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1)

# # Convert to DataFrame
# df = util.df(bars)
# df['EMA12'] = df['close'].ewm(span=12, adjust=False).mean()
# df['EMA26'] = df['close'].ewm(span=26, adjust=False).mean()
# df['MACD'] = df['EMA12'] - df['EMA26']
# df['Signal'] = df['MACD'].ewm(span=9, adjust=False).mean()

# # Define the trading logic
# position = 0  # 0 means no position, 1 means long position

# for i in range(1, len(df)):
#     if df['MACD'][i] > df['Signal'][i] and df['MACD'][i-1] <= df['Signal'][i-1] and position == 0:
#         # Buy signal
#         buy_order = LimitOrder('BUY', 10, df['close'][i])
#         trade = ib.placeOrder(contract, buy_order)
#         # print(f"Buy Order Status: {trade.orderStatus.status}")
#         position = 1
#     elif df['MACD'][i] < df['Signal'][i] and df['MACD'][i-1] >= df['Signal'][i-1] and position == 1:
#         # Sell signal
#         sell_order = LimitOrder('SELL', 10, df['close'][i])
#         trade = ib.placeOrder(contract, sell_order)
#         # print(f"Sell Order Status: {trade.orderStatus.status}")
#         position = 0

# print(f"Running Ichimoku Cloud Strategy Script")

# # Keep the script running to receive updates
# ib.run()
