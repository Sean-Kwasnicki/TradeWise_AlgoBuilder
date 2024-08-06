
def generate_sma_code(symbol, quantity, barSizeSetting, fast_sma, slow_sma):
    return f"""
# Simple Moving Average Cross Over Strategy
# This strategy uses the crossover of two SMAs to generate buy and sell signals.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract (e.g., AAPL stock)
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)

# Calculate the simple moving averages
df['SMA{fast_sma}'] = df['close'].rolling(window={fast_sma}).mean()
df['SMA{slow_sma}'] = df['close'].rolling(window={slow_sma}).mean()

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['SMA{fast_sma}'][i] > df['SMA{slow_sma}'][i] and df['SMA{fast_sma}'][i-1] <= df['SMA{slow_sma}'][i-1]:
        if position == 0:
            # Buy signal
            buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
            trade = ib.placeOrder(contract, buy_order)
            print(f"Buy Order Status: {{trade.orderStatus.status}}")
            position = 1
    elif df['SMA{fast_sma}'][i] < df['SMA{slow_sma}'][i] and df['SMA{fast_sma}'][i-1] >= df['SMA{slow_sma}'][i-1]:
        if position == 1:
            # Sell signal
            sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
            trade = ib.placeOrder(contract, sell_order)
            print(f"Sell Order Status: {{trade.orderStatus.status}}")
            position = 0

# Keep the script running to receive updates
ib.run()
"""


def generate_rsi_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
    return f"""
# Relative Strength Index (RSI) Strategy
# This strategy uses the RSI to generate buy and sell signals based on thresholds.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['change'] = df['close'].diff()
df['gain'] = df['change'].clip(lower=0)
df['loss'] = -df['change'].clip(upper=0)
df['avg_gain'] = df['gain'].rolling(window={period}).mean()
df['avg_loss'] = df['loss'].rolling(window={period}).mean()
df['rs'] = df['avg_gain'] / df['avg_loss']
df['rsi'] = 100 - (100 / (1 + df['rs']))

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['rsi'][i] < {buy_threshold} and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['rsi'][i] > {sell_threshold} and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_macd_code(symbol, quantity, barSizeSetting, fast_period, slow_period, signal_period):
    return f"""
# Moving Average Convergence Divergence (MACD) Strategy
# This strategy uses the crossover of two SMAs to generate buy and sell signals.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['EMA{fast_period}'] = df['close'].ewm(span={fast_period}, adjust=False).mean()
df['EMA{slow_period}'] = df['close'].ewm(span={slow_period}, adjust=False).mean()
df['MACD'] = df['EMA{fast_period}'] - df['EMA{slow_period}']
df['Signal'] = df['MACD'].ewm(span={signal_period}, adjust=False).mean()

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['MACD'][i] > df['Signal'][i] and df['MACD'][i-1] <= df['Signal'][i-1] and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['MACD'][i] < df['Signal'][i] and df['MACD'][i-1] >= df['Signal'][i-1] and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_bollinger_bands_code(symbol, quantity, barSizeSetting, period, std_dev):
    return f"""
# Bollinger Bands Strategy
# This strategy uses Bollinger Bands to generate buy and sell signals.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['SMA{period}'] = df['close'].rolling(window={period}).mean()
df['UpperBand'] = df['SMA{period}'] + ({std_dev} * df['close'].rolling(window={period}).std())
df['LowerBand'] = df['SMA{period}'] - ({std_dev} * df['close'].rolling(window={period}).std())

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['close'][i] < df['LowerBand'][i] and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['close'][i] > df['UpperBand'][i] and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_stochastic_code(symbol, quantity, barSizeSetting, k_period, d_period, buy_threshold, sell_threshold):
    return f"""
# Stochastic Strategy
# This strategy uses the Stochastic Oscillator to generate buy and sell signals based on %K and %D.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['L{k_period}'] = df['low'].rolling(window={k_period}).min()
df['H{k_period}'] = df['high'].rolling(window={k_period}).max()
df['%K'] = (df['close'] - df['L{k_period}']) / (df['H{k_period}'] - df['L{k_period}']) * 100
df['%D'] = df['%K'].rolling(window={d_period}).mean()

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['%K'][i] < {buy_threshold} and df['%D'][i] < {buy_threshold} and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['%K'][i] > {sell_threshold} and df['%D'][i] > {sell_threshold} and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_parabolic_sar_code(symbol, quantity, barSizeSetting, af_step, af_max):
    return f"""
# Parabolic SAR Strategy
# This strategy uses the Parabolic SAR to generate buy and sell signals based on the SAR value.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)

# Initialize PSAR variables
df['PSAR'] = df['close'].ewm(alpha={af_step}, adjust=False).mean()
df['AF'] = {af_step}
df['EP'] = df['close']
df['PSAR Direction'] = 'Bullish'

# Calculate PSAR values
for i in range(1, len(df)):
    if df['PSAR Direction'][i-1] == 'Bullish':
        df['PSAR'][i] = df['PSAR'][i-1] + df['AF'][i-1] * (df['EP'][i-1] - df['PSAR'][i-1])
        if df['close'][i] > df['EP'][i-1]:
            df['AF'][i] = min(df['AF'][i-1] + {af_step}, {af_max})
            df['EP'][i] = df['close'][i]
        if df['close'][i] < df['PSAR'][i]:
            df['PSAR Direction'][i] = 'Bearish'
            df['PSAR'][i] = df['EP'][i-1]
            df['AF'][i] = {af_step}
            df['EP'][i] = df['close'][i]
    else:
        df['PSAR'][i] = df['PSAR'][i-1] - df['AF'][i-1] * (df['PSAR'][i-1] - df['EP'][i-1])
        if df['close'][i] < df['EP'][i-1]:
            df['AF'][i] = min(df['AF'][i-1] + {af_step}, {af_max})
            df['EP'][i] = df['close'][i]
        if df['close'][i] > df['PSAR'][i]:
            df['PSAR Direction'][i] = 'Bullish'
            df['PSAR'][i] = df['EP'][i-1]
            df['AF'][i] = {af_step}
            df['EP'][i] = df['close'][i]

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['PSAR Direction'][i] == 'Bullish' and df['close'][i] > df['PSAR'][i] and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['PSAR Direction'][i] == 'Bearish' and df['close'][i] < df['PSAR'][i] and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_atr_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
    return f"""
# Average True Range (ATR) Strategy
# This strategy uses the ATR to generate buy and sell signals based on volatility thresholds.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['TR'] = df['high'].combine(df['close'].shift(), max) - df['low'].combine(df['close'].shift(), min)
df['ATR'] = df['TR'].rolling(window={period}).mean()

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['ATR'][i] < {buy_threshold} and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['ATR'][i] > {sell_threshold} and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""


def generate_cci_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
    return f"""
# Commodity Channel Index (CCI) Strategy
# This strategy uses the CCI to generate buy and sell signals based on threshold levels.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['TP'] = (df['close'] + df['high'] + df['low']) / 3
df['SMA{period}'] = df['TP'].rolling(window={period}).mean()
df['MAD'] = df['TP'].rolling(window={period}).apply(lambda x: pd.Series(x).mad())
df['CCI'] = (df['TP'] - df['SMA{period}']) / (0.015 * df['MAD'])

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['CCI'][i] < {buy_threshold} and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['CCI'][i] > {sell_threshold} and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_williams_r_code(symbol, quantity, barSizeSetting, period, buy_threshold, sell_threshold):
    return f"""
# Williams %R Strategy
# This strategy uses the Williams %R to generate buy and sell signals based on threshold levels.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)
df['HH'] = df['high'].rolling(window={period}).max()
df['LL'] = df['low'].rolling(window={period}).min()
df['%R'] = (df['HH'] - df['close']) / (df['HH'] - df['LL']) * -100

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(1, len(df)):
    if df['%R'][i] < {buy_threshold} and position == 0:
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif df['%R'][i] > {sell_threshold} and position == 1:
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""

def generate_ichimoku_cloud_code(symbol, quantity, barSizeSetting, conversionLinePeriod, baseLinePeriod, laggingSpanPeriod, displacement):
    return f"""
# Ichimoku Cloud Strategy
# This strategy uses the Ichimoku Cloud components to generate buy and sell signals based on cloud formation and crossovers.
from ib_insync import *
import pandas as pd

# Connect to TWS or IB Gateway
ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Define the contract
contract = Stock('{symbol}', 'SMART', 'USD')

# Fetch historical data
bars = ib.reqHistoricalData(
    contract,
    endDateTime='',
    durationStr='1 D',
    barSizeSetting='{barSizeSetting}',
    whatToShow='MIDPOINT',
    useRTH=True,
    formatDate=1)

# Convert to DataFrame
df = util.df(bars)

# Calculate Ichimoku Cloud components
df['ConversionLine'] = (df['high'].rolling(window={conversionLinePeriod}).max() + df['low'].rolling(window={conversionLinePeriod}).min()) / 2
df['BaseLine'] = (df['high'].rolling(window={baseLinePeriod}).max() + df['low'].rolling(window={baseLinePeriod}).min()) / 2
df['LeadingSpanA'] = ((df['ConversionLine'] + df['BaseLine']) / 2).shift({displacement})
df['LeadingSpanB'] = ((df['high'].rolling(window={laggingSpanPeriod}).max() + df['low'].rolling(window={laggingSpanPeriod}).min()) / 2).shift({displacement})
df['LaggingSpan'] = df['close'].shift(-{displacement})

# Define the trading logic
position = 0  # 0 means no position, 1 means long position

for i in range(max(conversionLinePeriod, baseLinePeriod, laggingSpanPeriod), len(df)):
    if (df['close'][i] > df['LeadingSpanA'][i]
        and df['close'][i] > df['LeadingSpanB'][i]
        and df['LeadingSpanA'][i] > df['LeadingSpanB'][i]
        and position == 0):
        # Buy signal
        buy_order = LimitOrder('BUY', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, buy_order)
        print(f"Buy Order Status: {{trade.orderStatus.status}}")
        position = 1
    elif (df['close'][i] < df['LeadingSpanA'][i]
          and df['close'][i] < df['LeadingSpanB'][i]
          and df['LeadingSpanA'][i] < df['LeadingSpanB'][i]
          and position == 1):
        # Sell signal
        sell_order = LimitOrder('SELL', {quantity}, df['close'][i])
        trade = ib.placeOrder(contract, sell_order)
        print(f"Sell Order Status: {{trade.orderStatus.status}}")
        position = 0

# Keep the script running to receive updates
ib.run()
"""
