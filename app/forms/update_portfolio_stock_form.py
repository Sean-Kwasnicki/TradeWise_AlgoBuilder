from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField
from wtforms.validators import DataRequired, NumberRange

class UpdatePortfolioStockForm(FlaskForm):
  quantity = IntegerField('quantity', validators=[DataRequired(), NumberRange(min=1)])
  purchase_price = DecimalField('purchase_price', validators=[DataRequired(), NumberRange(min=0)])
  current_price = DecimalField('current_price', validators=[DataRequired(), NumberRange(min=0)])
