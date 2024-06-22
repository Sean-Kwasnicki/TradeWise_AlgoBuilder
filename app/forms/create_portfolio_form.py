from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange

class CreatePortfolioForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=100)])
    initial_balance = DecimalField('initial_balance', validators=[DataRequired(), NumberRange(min=0)])
