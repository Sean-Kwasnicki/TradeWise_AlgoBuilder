from wtforms import StringField, IntegerField, Field
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
import json

class JSONField(Field):
    def _value(self):
        if self.data:
            return json.dumps(self.data)
        return ''

    def process_formdata(self, valuelist):
        if valuelist:
            try:
                self.data = json.loads(valuelist[0])
            except ValueError:
                self.data = None
                raise ValueError('Invalid JSON')

class AlgorithmBlockForm(FlaskForm):
    algorithm_id = IntegerField('algorithm_id', validators=[DataRequired()])
    Technical_inidicator_type = StringField('Technical_inidicator_type', validators=[DataRequired()])
    parameters = JSONField('parameters', validators=[DataRequired()])
    block_order = IntegerField('block_order', validators=[DataRequired()])
