# # Works and buys stocks
# from ib_insync import *
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=2)

# # Ask the user for the stock symbol and quantity
# symbol = input("Enter the stock symbol (e.g., AAPL): ")
# quantity = int(input("Enter the quantity to trade: "))

# # Define the contract based on user input
# contract = Stock(symbol, 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 D',
#     barSizeSetting='5 mins',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = util.df(bars)

# # Calculate the simple moving averages
# df['SMA20'] = df['close'].rolling(window=20).mean()
# df['SMA50'] = df['close'].rolling(window=50).mean()

# # Define the trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place limit order
# def place_limit_order(action, quantity, price):
#     order = LimitOrder(action, quantity, price)
#     trade = ib.placeOrder(contract, order)
#     print(f"{action} Order Status: {trade.orderStatus.status} Trade Price: {df['SMA50'][i]}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on SMA signals
# for i in range(1, len(df)):
#     if df['SMA20'][i] > df['SMA50'][i] and df['SMA20'][i-1] <= df['SMA50'][i-1]:
#         if position == 0:
#             # Buy signal
#             limit_price = df['SMA50'][i]
#             trade = place_limit_order('BUY', quantity, df['open'][i])
#             position = 1
#     elif df['SMA20'][i] < df['SMA50'][i] and df['SMA20'][i-1] >= df['SMA50'][i-1]:
#         if position == 1:
#             # Sell signal
#             trade = place_limit_order('SELL', quantity, df['SMA50'][i])
#             position = 0

# # Keep the script running to receive updates
# ib.run()

######################################################

# from ib_insync import *
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Ask the user for the stock symbol and quantity
# symbol = input("Enter the stock symbol (e.g., AAPL): ")
# quantity = int(input("Enter the quantity to trade: "))

# # Define the contract based on user input
# contract = Stock(symbol, 'SMART', 'USD')

# # Fetch historical data for the past month with daily bars
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='1 day',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = util.df(bars)

# # Calculate the simple moving averages
# df['SMA20'] = df['close'].rolling(window=20).mean()
# df['SMA50'] = df['close'].rolling(window=50).mean()

# # Define the trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place limit order
# def place_limit_order(action, quantity, price):
#     order = LimitOrder(action, quantity, price)
#     trade = ib.placeOrder(contract, order)
#     print(f"{action} Order Status: {trade.orderStatus.status}")
#     print(f"{action} Order Price: {price}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on SMA signals
# for i in range(1, len(df)):
#     if df['SMA20'][i] > df['SMA50'][i] and df['SMA20'][i-1] <= df['SMA50'][i-1]:
#         if position == 0:
#             # Buy signal
#             limit_price = df['close'][i]
#             if df['close'][i] < limit_price:
#                 trade = place_limit_order('BUY', quantity, limit_price)
#                 position = 1
#     elif df['SMA20'][i] < df['SMA50'][i] and df['SMA20'][i-1] >= df['SMA50'][i-1]:
#         if position == 1:
#             # Sell signal
#             limit_price = df['close'][i]
#             if df['close'][i] > limit_price:
#                 trade = place_limit_order('SELL', quantity, limit_price)
#                 position = 0

# # Keep the script running to receive updates
# ib.run()


############################################
