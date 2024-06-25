from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, NumberRange, Length

class AddPortfolioStockForm(FlaskForm):
    stock_symbol = StringField('stock_symbol', validators=[DataRequired(), Length(max=10)])
    quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1)])
    purchase_price = DecimalField('purchase_price', validators=[DataRequired(), NumberRange(min=0)])
