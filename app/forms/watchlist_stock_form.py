from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class WatchlistStockForm(FlaskForm):
    stock_symbol = StringField('stock_symbol', validators=[DataRequired(), Length(max=10)])
