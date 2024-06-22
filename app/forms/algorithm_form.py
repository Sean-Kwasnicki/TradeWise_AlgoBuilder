from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class AlgorithmForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('description', validators=[DataRequired()])
