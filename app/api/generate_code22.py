# def generate_sma_code(symbol, quantity, barSizeSetting, fast_sma, slow_sma):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['SMA{fast_sma}'] = df['close'].rolling(window={fast_sma}).mean()
# df['SMA{slow_sma}'] = df['close'].rolling(window={slow_sma}).mean()

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on SMA signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: SMA{fast_sma}={{df['SMA{fast_sma}'][i]}}, SMA{slow_sma}={{df['SMA{slow_sma}'][i]}}, Close={{df['close'][i]}}")
#     if df['SMA{fast_sma}'][i] > df['SMA{slow_sma}'][i] and df['SMA{fast_sma}'][i-1] <= df['SMA{slow_sma}'][i-1]:
#         if position == 0:
#             # Buy signal
#             print(f"Buy signal detected at row {{i}}, placing market order")
#             trade = place_market_order('BUY', {quantity})
#             position = 1
#     elif df['SMA{fast_sma}'][i] < df['SMA{slow_sma}'][i] and df['SMA{fast_sma}'][i-1] >= df['SMA{slow_sma}'][i-1]:
#         if position == 1:
#             # Sell signal
#             print(f"Sell signal detected at row {{i}}, placing market order")
#             trade = place_market_order('SELL', {quantity})
#             position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_rsi_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['RSI'] = df['close'].diff(1).apply(lambda x: x if x > 0 else 0).rolling(window={period}).mean() / df['close'].diff(1).abs().rolling(window={period}).mean() * 100

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on RSI signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: RSI={{df['RSI'][i]}}, Close={{df['close'][i]}}")
#     if df['RSI'][i] < {buy_threshold}:
#         if position == 0:
#             # Buy signal
#             print(f"Buy signal detected at row {{i}}, placing market order")
#             trade = place_market_order('BUY', {quantity})
#             position = 1
#     elif df['RSI'][i] > {sell_threshold}:
#         if position == 1:
#             # Sell signal
#             print(f"Sell signal detected at row {{i}}, placing market order")
#             trade = place_market_order('SELL', {quantity})
#             position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_macd_code(symbol, quantity, barSizeSetting, fast_period, slow_period, signal_period, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['EMA{fast_period}'] = df['close'].ewm(span={fast_period}, adjust=False).mean()
# df['EMA{slow_period}'] = df['close'].ewm(span={slow_period}, adjust=False).mean()
# df['MACD'] = df['EMA{fast_period}'] - df['EMA{slow_period}']
# df['Signal'] = df['MACD'].ewm(span={signal_period}, adjust=False).mean()

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on MACD signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: MACD={{df['MACD'][i]}}, Signal={{df['Signal'][i]}}, Close={{df['close'][i]}}")
#     if df['MACD'][i] > df['Signal'][i] and df['MACD'][i-1] <= df['Signal'][i-1]:
#         if position == 0:
#             # Buy signal
#             print(f"Buy signal detected at row {{i}}, placing market order")
#             trade = place_market_order('BUY', {quantity})
#             position = 1
#     elif df['MACD'][i] < df['Signal'][i] and df['MACD'][i-1] >= df['Signal'][i-1]:
#         if position == 1:
#             # Sell signal
#             print(f"Sell signal detected at row {{i}}, placing market order")
#             trade = place_market_order('SELL', {quantity})
#             position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_bollinger_bands_code(symbol, quantity, barSizeSetting, period, std_dev, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['SMA{period}'] = df['close'].rolling(window={period}).mean()
# df['UpperBand'] = df['SMA{period}'] + ({std_dev} * df['close'].rolling(window={period}).std())
# df['LowerBand'] = df['SMA{period}'] - ({std_dev} * df['close'].rolling(window={period}).std())

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on Bollinger Bands signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: Close={{df['close'][i]}}, UpperBand={{df['UpperBand'][i]}}, LowerBand={{df['LowerBand'][i]}}")
#     if df['close'][i] < df['LowerBand'][i] and position == 0:
#         # Buy signal
#         print(f"Buy signal detected at row {{i}}, placing market order")
#         trade = place_market_order('BUY', {quantity})
#         position = 1
#     elif df['close'][i] > df['UpperBand'][i] and position == 1:
#         # Sell signal
#         print(f"Sell signal detected at row {{i}}, placing market order")
#         trade = place_market_order('SELL', {quantity})
#         position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_stochastic_code(symbol, quantity, barSizeSetting, k_period, d_period, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['L14'] = df['low'].rolling(window={k_period}).min()
# df['H14'] = df['high'].rolling(window={k_period}).max()
# df['%K'] = (df['close'] - df['L14']) * 100 / (df['H14'] - df['L14'])
# df['%D'] = df['%K'].rolling(window={d_period}).mean()

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on Stochastic Oscillator signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: %K={{df['%K'][i]}}, %D={{df['%D'][i]}}")
#     if df['%K'][i] < {buy_threshold} and df['%D'][i] < {buy_threshold} and position == 0:
#         # Buy signal
#         print(f"Buy signal detected at row {{i}}, placing market order")
#         trade = place_market_order('BUY', {quantity})
#         position = 1
#     elif df['%K'][i] > {sell_threshold} and df['%D'][i] > {sell_threshold} and position == 1:
#         # Sell signal
#         print(f"Sell signal detected at row {{i}}, placing market order")
#         trade = place_market_order('SELL', {quantity})
#         position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_parabolic_sar_code(symbol, quantity, barSizeSetting, af_step, af_max, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['PSAR'] = df['close'].ewm(alpha={af_step}, adjust=False).mean()
# df['AF'] = {af_step}
# df['EP'] = df['close']
# df['PSAR Direction'] = 'Bullish'

# # Initialize PSAR values
# for i in range(1, len(df)):
#     if df['PSAR Direction'][i-1] == 'Bullish':
#         df['PSAR'][i] = df['PSAR'][i-1] + df['AF'][i-1] * (df['EP'][i-1] - df['PSAR'][i-1])
#         if df['close'][i] > df['EP'][i-1]:
#             df['AF'][i] = min(df['AF'][i-1] + {af_step}, {af_max})
#             df['EP'][i] = df['close'][i]
#         if df['close'][i] < df['PSAR'][i]:
#             df['PSAR Direction'][i] = 'Bearish'
#             df['PSAR'][i] = df['EP'][i-1]
#             df['AF'][i] = {af_step}
#             df['EP'][i] = df['close'][i]
#     else:
#         df['PSAR'][i] = df['PSAR'][i-1] - df['AF'][i-1] * (df['PSAR'][i-1] - df['EP'][i-1])
#         if df['close'][i] < df['EP'][i-1]:
#             df['AF'][i] = min(df['AF'][i-1] + {af_step}, {af_max})
#             df['EP'][i] = df['close'][i]
#         if df['close'][i] > df['PSAR'][i]:
#             df['PSAR Direction'][i] = 'Bullish'
#             df['PSAR'][i] = df['EP'][i-1]
#             df['AF'][i] = {af_step}
#             df['EP'][i] = df['close'][i]

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on Parabolic SAR signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: PSAR={{df['PSAR'][i]}}, Close={{df['close'][i]}}")
#     if df['PSAR Direction'][i] == 'Bullish' and df['close'][i] > df['PSAR'][i] and position == 0:
#         # Buy signal
#         print(f"Buy signal detected at row {{i}}, placing market order")
#         trade = place_market_order('BUY', {quantity})
#         position = 1
#     elif df['PSAR Direction'][i] == 'Bearish' and df['close'][i] < df['PSAR'][i] and position == 1:
#         # Sell signal
#         print(f"Sell signal detected at row {{i}}, placing market order")
#         trade = place_market_order('SELL', {quantity})
#         position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_atr_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['TR'] = df['high'] - df['low']
# df['ATR'] = df['TR'].rolling(window={period}).mean()

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on ATR signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: ATR={{df['ATR'][i]}}, Close={{df['close'][i]}}")
#     if df['close'][i] < df['ATR'][i] and position == 0:
#         # Buy signal
#         print(f"Buy signal detected at row {{i}}, placing market order")
#         trade = place_market_order('BUY', {quantity})
#         position = 1
#     elif df['close'][i] > df['ATR'][i] and position == 1:
#         # Sell signal
#         print(f"Sell signal detected at row {{i}}, placing market order")
#         trade = place_market_order('SELL', {quantity})
#         position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_cci_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['TP'] = (df['close'] + df['high'] + df['low']) / 3
# df['SMA{period}'] = df['TP'].rolling(window={period}).mean()
# df['MAD'] = df['TP'].rolling(window={period}).apply(lambda x: pd.Series(x).mad())
# df['CCI'] = (df['TP'] - df['SMA{period}']) / (0.015 * df['MAD'])

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on CCI signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: CCI={{df['CCI'][i]}}, Close={{df['close'][i]}}")
#     if df['CCI'][i] < {buy_threshold} and position == 0:
#         # Buy signal
#         print(f"Buy signal detected at row {{i}}, placing market order")
#         trade = place_market_order('BUY', {quantity})
#         position = 1
#     elif df['CCI'][i] > {sell_threshold} and position == 1:
#         # Sell signal
#         print(f"Sell signal detected at row {{i}}, placing market order")
#         trade = place_market_order('SELL', {quantity})
#         position = 0

# # Keep the script running to receive updates
# ib.run()
# """

# def generate_williams_r_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
#     return f"""
# from ib_insync import IB, Stock, MarketOrder
# import pandas as pd

# # Connect to TWS or IB Gateway
# ib = IB()
# ib.connect('127.0.0.1', 7497, clientId=1)

# # Define the contract based on user input
# contract = Stock('{symbol}', 'SMART', 'USD')

# # Fetch historical data
# bars = ib.reqHistoricalData(
#     contract,
#     endDateTime='',
#     durationStr='1 M',
#     barSizeSetting='{barSizeSetting}',
#     whatToShow='MIDPOINT',
#     useRTH=True,
#     formatDate=1
# )

# # Convert to DataFrame
# df = pd.DataFrame(bars)
# df['HH'] = df['high'].rolling(window={period}).max()
# df['LL'] = df['low'].rolling(window={period}).min()
# df['%R'] = (df['HH'] - df['close']) / (df['HH'] - df['LL']) * -100

# # Print the DataFrame to check the data
# print(df.tail())

# # Trading logic
# position = 0  # 0 means no position, 1 means long position

# # Function to place market order
# def place_market_order(action, quantity):
#     order = MarketOrder(action, quantity)
#     trade = ib.placeOrder(contract, order)
#     print(f"{{action}} Order Status: {{trade.orderStatus.status}}")
#     return trade

# # Check for existing positions
# positions = ib.positions()
# for pos in positions:
#     if pos.contract.symbol == contract.symbol:
#         position = 1 if pos.position > 0 else 0

# # Trading logic based on Williams %R signals
# for i in range(1, len(df)):
#     print(f"Checking row {{i}}: %R={{df['%R'][i]}}, Close={{df['close'][i]}}")
#     if df['%R'][i] < {buy_threshold} and position == 0:
#         # Buy signal
#         print(f"Buy signal detected at row {{i}}, placing market order")
#         trade = place_market_order('BUY', {quantity})
#         position = 1
#     elif df['%R'][i] > {sell_threshold} and position == 1:
#         # Sell signal
#         print(f"Sell signal detected at row {{i}}, placing market order")
#         trade = place_market_order('SELL', {quantity})
#         position = 0

# # Keep the script running to receive updates
# ib.run()
# """




# # # generate_code.py
# # def generate_sma_code():
# #     return """
# # # sma_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_sma(prices, window):
# #     if len(prices) < window:
# #         raise ValueError("Not enough data points to calculate SMA")
# #     return np.convolve(prices, np.ones(window), 'valid') / window

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter SMA window period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below SMA): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below SMA): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above SMA): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             sma = calculate_sma(prices, window)

# #             last_price = prices[-1]
# #             last_sma = sma[-1]

# #             buy_price_threshold_low = last_sma * buy_threshold_low
# #             buy_price_threshold_high = last_sma * buy_threshold_high
# #             sell_price_threshold = last_sma * sell_threshold

# #             print(f"SMA({window}) for {symbol}: {last_sma}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_price <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_price >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_rsi_code():
# #     return """
# # # rsi_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_rsi(prices, window):
# #     deltas = np.diff(prices)
# #     seed = deltas[:window+1]
# #     up = seed[seed >= 0].sum()/window
# #     down = -seed[seed < 0].sum()/window
# #     rs = up/down
# #     rsi = np.zeros_like(prices)
# #     rsi[:window] = 100. - 100./(1.+rs)

# #     for i in range(window, len(prices)):
# #         delta = deltas[i-1]

# #         if delta > 0:
# #             upval = delta
# #             downval = 0.
# #         else:
# #             upval = 0.
# #             downval = -delta

# #         up = (up*(window-1) + upval)/window
# #         down = (down*(window-1) + downval)/window

# #         rs = up/down
# #         rsi[i] = 100. - 100./(1.+rs)

# #     return rsi

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter RSI window period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below RSI): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below RSI): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above RSI): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             rsi = calculate_rsi(prices, window)

# #             last_price = prices[-1]
# #             last_rsi = rsi[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"RSI({window}) for {symbol}: {last_rsi}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_rsi <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_rsi >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_macd_code():
# #     return """
# # # macd_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_macd(prices, slow, fast, signal):
# #     ema_slow = calculate_ema(prices, slow)
# #     ema_fast = calculate_ema(prices, fast)
# #     macd = np.array(ema_fast) - np.array(ema_slow)
# #     signal_line = calculate_ema(macd, signal)
# #     return macd, signal_line

# # def calculate_ema(prices, window):
# #     alpha = 2 / (window + 1)
# #     ema = [prices[0]]
# #     for price in prices[1:]:
# #         ema.append(alpha * price + (1 - alpha) * ema[-1])
# #     return ema

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         slow = int(input("Enter slow EMA period: "))
# #         fast = int(input("Enter fast EMA period: "))
# #         signal = int(input("Enter signal period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below MACD): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below MACD): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above MACD): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             macd, signal_line = calculate_macd(prices, slow, fast, signal)
# #             last_price = prices[-1]
# #             last_macd = macd[-1]
# #             last_signal_line = signal_line[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"MACD({slow}, {fast}, {signal}) for {symbol}: {last_macd}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_macd <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_macd >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_bollinger_bands_code():
# #     return """
# # # bollinger_bands_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_bollinger_bands(prices, window, num_std_dev):
# #     sma = np.convolve(prices, np.ones(window), 'valid') / window
# #     rolling_std = np.std([prices[i:i+window] for i in range(len(prices) - window + 1)], axis=1)
# #     upper_band = sma + (rolling_std * num_std_dev)
# #     lower_band = sma - (rolling_std * num_std_dev)
# #     return upper_band, lower_band

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter Bollinger Bands window period: "))
# #         num_std_dev = int(input("Enter number of standard deviations: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below lower band): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below lower band): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above upper band): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             upper_band, lower_band = calculate_bollinger_bands(prices, window, num_std_dev)
# #             last_price = prices[-1]
# #             last_upper_band = upper_band[-1]
# #             last_lower_band = lower_band[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"Bollinger Bands({window}, {num_std_dev}) for {symbol}: Lower Band: {last_lower_band}, Upper Band: {last_upper_band}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_lower_band <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_upper_band >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_stochastic_code():
# #     return """
# # # stochastic_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_stochastic_oscillator(prices, window):
# #     stoch = [(price - min(prices[i-window:i+1])) / (max(prices[i-window:i+1]) - min(prices[i-window:i+1])) * 100 for i, price in enumerate(prices) if i >= window]
# #     return stoch

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter Stochastic Oscillator window period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below Stochastic Oscillator): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below Stochastic Oscillator): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above Stochastic Oscillator): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             stoch = calculate_stochastic_oscillator(prices, window)

# #             last_price = prices[-1]
# #             last_stoch = stoch[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"Stochastic Oscillator({window}) for {symbol}: {last_stoch}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_stoch <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_stoch >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_parabolic_sar_code():
# #     return """
# # # parabolic_sar_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_parabolic_sar(highs, lows, af=0.02, max_af=0.2):
# #     sar = [lows[0]]  # Initial SAR value
# #     ep = highs[0]  # Extreme Point (EP)
# #     uptrend = True
# #     af_increment = af
# #     for i in range(1, len(highs)):
# #         if uptrend:
# #             sar.append(sar[-1] + af * (ep - sar[-1]))
# #             if highs[i] > ep:
# #                 ep = highs[i]
# #                 af = min(af + af_increment, max_af)
# #             if lows[i] < sar[-1]:
# #                 uptrend = False
# #                 sar[-1] = ep
# #                 ep = lows[i]
# #                 af = af_increment
# #         else:
# #             sar.append(sar[-1] + af * (ep - sar[-1]))
# #             if lows[i] < ep:
# #                 ep = lows[i]
# #                 af = min(af + af_increment, max_af)
# #             if highs[i] > sar[-1]:
# #                 uptrend = True
# #                 sar[-1] = ep
# #                 ep = highs[i]
# #                 af = af_increment
# #     return sar

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         af = float(input("Enter acceleration factor: "))
# #         max_af = float(input("Enter maximum acceleration factor: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below SAR): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below SAR): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above SAR): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             highs = [bar.high for bar in bars]
# #             lows = [bar.low for bar in bars]
# #             sar = calculate_parabolic_sar(highs, lows, af, max_af)

# #             last_price = prices[-1]
# #             last_sar = sar[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"Parabolic SAR for {symbol}: {last_sar}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_sar <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_sar >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_atr_code():
# #     return """
# # # atr_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_atr(highs, lows, closes, window):
# #     tr = [max(h - l, abs(h - c), abs(l - c)) for h, l, c in zip(highs[1:], lows[1:], closes[:-1])]
# #     atr = [np.mean(tr[:window])]
# #     for i in range(window, len(tr)):
# #         atr.append((atr[-1] * (window - 1) + tr[i]) / window)
# #     return atr

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter ATR window period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below ATR): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below ATR): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above ATR): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             highs = [bar.high for bar in bars]
# #             lows = [bar.low for bar in bars]
# #             closes = [bar.close for bar in bars]
# #             atr = calculate_atr(highs, lows, closes, window)

# #             last_price = prices[-1]
# #             last_atr = atr[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"ATR({window}) for {symbol}: {last_atr}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_atr <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_atr >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_cci_code():
# #     return """
# # # cci_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_cci(highs, lows, closes, window):
# #     typical_prices = [(h + l + c) / 3 for h, l, c in zip(highs, lows, closes)]
# #     sma = np.convolve(typical_prices, np.ones(window), 'valid') / window
# #     mean_deviation = [np.mean([abs(tp - sma[i]) for tp in typical_prices[i:i+window]]) for i in range(len(sma))]
# #     cci = [(tp - sma[i]) / (0.015 * md) for i, (tp, md) in enumerate(zip(typical_prices[window-1:], mean_deviation))]
# #     return cci

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter CCI window period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below CCI): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below CCI): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above CCI): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             highs = [bar.high for bar in bars]
# #             lows = [bar.low for bar in bars]
# #             closes = [bar.close for bar in bars]
# #             cci = calculate_cci(highs, lows, closes, window)

# #             last_price = prices[-1]
# #             last_cci = cci[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"CCI({window}) for {symbol}: {last_cci}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_cci <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_cci >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """

# # def generate_williams_r_code():
# #     return """
# # # williams_r_trading_standing_order.py
# # from ib_insync import IB, Stock, MarketOrder, Trade
# # import numpy as np
# # import time

# # def calculate_williams_r(highs, lows, closes, window):
# #     williams_r = [((h - c) / (h - l)) * -100 for h, l, c in zip(highs[window:], lows[window:], closes[window:])]
# #     return williams_r

# # def main():
# #     ib = IB()
# #     try:
# #         ib.connect('127.0.0.1', 7497, clientId=1)
# #         print("Connected to Interactive Brokers TWS")
# #     except Exception as e:
# #         print(f"Error connecting to IB: {e}")
# #         return

# #     try:
# #         symbol = input("Enter stock symbol: ")
# #         window = int(input("Enter Williams %R window period: "))
# #         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below Williams %R): "))
# #         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below Williams %R): "))
# #         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above Williams %R): "))
# #         trade_amount = int(input("Enter trade amount: "))

# #         stock = Stock(symbol, 'SMART', 'USD')
# #         buy_order_placed = False
# #         sell_order_placed = False
# #         standing_order = None

# #         while True:
# #             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
# #                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

# #             prices = [bar.close for bar in bars]
# #             highs = [bar.high for bar in bars]
# #             lows = [bar.low for bar in bars]
# #             closes = [bar.close for bar in bars]
# #             williams_r = calculate_williams_r(highs, lows, closes, window)

# #             last_price = prices[-1]
# #             last_williams_r = williams_r[-1]

# #             buy_price_threshold_low = buy_threshold_low
# #             buy_price_threshold_high = buy_threshold_high
# #             sell_price_threshold = sell_threshold

# #             print(f"Williams %R({window}) for {symbol}: {last_williams_r}")
# #             print(f"Last price: {last_price}")
# #             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
# #             print(f"Sell price threshold: {sell_price_threshold}")

# #             if not buy_order_placed and buy_price_threshold_low <= last_williams_r <= buy_price_threshold_high:
# #                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('BUY', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 buy_order_placed = True
# #                 print("Purchase order placed.")

# #             if buy_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Purchase completed at {last_price}.")
# #                     buy_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing buy order is active.")

# #             if not sell_order_placed and last_williams_r >= sell_price_threshold:
# #                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
# #                 order = MarketOrder('SELL', trade_amount)
# #                 standing_order = ib.placeOrder(stock, order)
# #                 sell_order_placed = True
# #                 print("Sale order placed.")

# #             if sell_order_placed and standing_order:
# #                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
# #                 if standing_order.orderStatus.status == 'Filled':
# #                     print(f"Sale completed at {last_price}.")
# #                     sell_order_placed = False  # Reset for potential new orders
# #                 else:
# #                     print("Standing sell order is active.")

# #             time.sleep(60)  # Check every 60 seconds

# #     except ValueError as ve:
# #         print(f"Value error: {ve}")
# #     except Exception as e:
# #         print(f"An error occurred: {e}")
# #     finally:
# #         ib.disconnect()

# # if __name__ == '__main__':
# #     main()
# # """
