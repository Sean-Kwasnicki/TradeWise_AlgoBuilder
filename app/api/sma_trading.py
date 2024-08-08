
# # sma_trading_standing_order.py
# from ib_insync import IB, Stock, MarketOrder, Trade
# import numpy as np
# import time

# def calculate_sma(prices, window):
#     if len(prices) < window:
#         raise ValueError("Not enough data points to calculate SMA")
#     return np.convolve(prices, np.ones(window), 'valid') / window

# def main():
#     ib = IB()
#     try:
#         ib.connect('127.0.0.1', 7497, clientId=1)
#         print("Connected to Interactive Brokers TWS")
#     except Exception as e:
#         print(f"Error connecting to IB: {e}")
#         return

#     try:
#         symbol = input("Enter stock symbol: ")
#         window = int(input("Enter SMA window period: "))
#         buy_threshold_low = float(input("Enter lower bound of buy threshold (e.g., 0.90 for 10% below SMA): "))
#         buy_threshold_high = float(input("Enter upper bound of buy threshold (e.g., 0.95 for 5% below SMA): "))
#         sell_threshold = float(input("Enter sell threshold (e.g., 1.05 for 5% above SMA): "))
#         trade_amount = int(input("Enter trade amount: "))

#         stock = Stock(symbol, 'SMART', 'USD')
#         buy_order_placed = False
#         sell_order_placed = False
#         standing_order = None

#         while True:
#             bars = ib.reqHistoricalData(stock, endDateTime='', durationStr='1 D',
#                                         barSizeSetting='5 mins', whatToShow='MIDPOINT', useRTH=False)

#             prices = [bar.close for bar in bars]
#             sma = calculate_sma(prices, window)

#             last_price = prices[-1]
#             last_sma = sma[-1]

#             buy_price_threshold_low = last_sma * buy_threshold_low
#             buy_price_threshold_high = last_sma * buy_threshold_high
#             sell_price_threshold = last_sma * sell_threshold

#             print(f"SMA({window}) for {symbol}: {last_sma}")
#             print(f"Last price: {last_price}")
#             print(f"Buy price threshold range: {buy_price_threshold_low} - {buy_price_threshold_high}")
#             print(f"Sell price threshold: {sell_price_threshold}")

#             if not buy_order_placed and buy_price_threshold_low <= last_price <= buy_price_threshold_high:
#                 print(f"Buying {trade_amount} shares of {symbol} at {last_price}")
#                 order = MarketOrder('BUY', trade_amount)
#                 standing_order = ib.placeOrder(stock, order)
#                 buy_order_placed = True
#                 print("Purchase order placed.")

#             if buy_order_placed and standing_order:
#                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
#                 if standing_order.orderStatus.status == 'Filled':
#                     print(f"Purchase completed at {last_price}.")
#                     buy_order_placed = False  # Reset for potential new orders
#                 else:
#                     print("Standing buy order is active.")

#             if not sell_order_placed and last_price >= sell_price_threshold:
#                 print(f"Selling {trade_amount} shares of {symbol} at {last_price}")
#                 order = MarketOrder('SELL', trade_amount)
#                 standing_order = ib.placeOrder(stock, order)
#                 sell_order_placed = True
#                 print("Sale order placed.")

#             if sell_order_placed and standing_order:
#                 ib.sleep(5)  # Sleep for a moment to ensure the order gets processed
#                 if standing_order.orderStatus.status == 'Filled':
#                     print(f"Sale completed at {last_price}.")
#                     sell_order_placed = False  # Reset for potential new orders
#                 else:
#                     print("Standing sell order is active.")

#             time.sleep(60)  # Check every 60 seconds

#     except ValueError as ve:
#         print(f"Value error: {ve}")
#     except Exception as e:
#         print(f"An error occurred: {e}")
#     finally:
#         ib.disconnect()

# if __name__ == '__main__':
#     main()
