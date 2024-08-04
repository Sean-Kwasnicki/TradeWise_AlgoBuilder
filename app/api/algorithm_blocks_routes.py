
# algorithm_block_routes.py
from flask import Blueprint, request, jsonify
from .generate_code import (
    generate_sma_code, generate_rsi_code, generate_macd_code, generate_bollinger_bands_code,
    generate_stochastic_code, generate_parabolic_sar_code, generate_atr_code, generate_cci_code,
    generate_williams_r_code, generate_ichimoku_cloud_code
)

algorithm_block_routes = Blueprint('algorithm_blocks', __name__)

@algorithm_block_routes.route('/generate_code', methods=['POST'])
def generate_code_route():
    try:
        data = request.json
        print("Received data:", data)  # Add logging to check received data
        indicator_type = data.get('indicator_type')

        if indicator_type == 'sma':
            code = generate_sma_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['fast_sma'], data['slow_sma']
            )
        elif indicator_type == 'rsi':
            code = generate_rsi_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['period'], data['buy_threshold'], data['sell_threshold']
            )
        elif indicator_type == 'macd':
            code = generate_macd_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['fast_period'], data['slow_period'], data['signal_period']
            )
        elif indicator_type == 'bollinger_bands':
            code = generate_bollinger_bands_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['period'], data['std_dev']
            )
        elif indicator_type == 'stochastic':
            code = generate_stochastic_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['k_period'], data['d_period'], data['buy_threshold'], data['sell_threshold']
            )
        elif indicator_type == 'parabolic_sar':
            code = generate_parabolic_sar_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['af_step'], data['af_max']
            )
        elif indicator_type == 'atr':
            code = generate_atr_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['period'], data['buy_threshold'], data['sell_threshold']
            )
        elif indicator_type == 'cci':
            code = generate_cci_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['period'], data['buy_threshold'], data['sell_threshold']
            )
        elif indicator_type == 'williams_r':
            code = generate_williams_r_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['period'], data['buy_threshold'], data['sell_threshold']
            )
        elif indicator_type == 'ichimoku_cloud':
            code = generate_ichimoku_cloud_code(
                data['symbol'], data['quantity'], data['barSizeSetting'], data['conversionLinePeriod'], data['baseLinePeriod'], data['laggingSpanPeriod'], data['displacement']
            )
        else:
            return jsonify({'error': 'Invalid indicator type'}), 400

        return jsonify({'code': code})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
