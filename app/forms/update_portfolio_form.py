from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange

class UpdatePortfolioForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=100)])
    initial_balance = DecimalField('initial_balance', validators=[DataRequired(), NumberRange(min=0)])
    current_value = DecimalField('current_value', validators=[DataRequired(), NumberRange(min=0)])
    profit_loss = DecimalField('profit_loss', validators=[DataRequired()])
