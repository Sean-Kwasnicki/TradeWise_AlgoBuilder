from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DecimalField
from wtforms.validators import DataRequired

class BacktestForm(FlaskForm):
    algorithm_id = IntegerField('algorithm_id', validators=[DataRequired()])
    start_date = StringField('start_date', validators=[DataRequired()])
    end_date = StringField('end_date', validators=[DataRequired()])
    initial_balance = DecimalField('initial_balance', validators=[DataRequired()])
    final_balance = DecimalField('final_balance', validators=[DataRequired()])
    profit_loss = DecimalField('profit_loss', validators=[DataRequired()])
    drawdown = DecimalField('drawdown', validators=[DataRequired()])
    roi = DecimalField('roi', validators=[DataRequired()])
