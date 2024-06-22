from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField
from wtforms.validators import DataRequired, NumberRange

class AddPortfolioStockForm(FlaskForm):
  stock_id = IntegerField('stock_id', validators=[DataRequired()])
  quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1)])
  purchase_price = DecimalField('purchase_price', validators=[DataRequired(), NumberRange(min=0)])
