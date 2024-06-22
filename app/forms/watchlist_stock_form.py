from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class WatchlistStockForm(FlaskForm):
  stock_id = IntegerField('stock_id', validators=[DataRequired()])
