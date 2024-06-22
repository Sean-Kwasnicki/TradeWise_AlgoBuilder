from .db import db

class AlgorithmBlock(db.Model):
    __tablename__ = 'algorithm_blocks'

    id = db.Column(db.Integer, primary_key=True)
    algorithm_id = db.Column(db.Integer, db.ForeignKey('algorithms.id'), nullable=False)
    technical_indicator_type = db.Column(db.String(50), nullable=False)
    parameters = db.Column(db.JSON, nullable=False)
    block_order = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    algorithm = db.relationship('Algorithm', back_populates='blocks')

    def to_dict(self):
        return {
            'id': self.id,
            'algorithm_id': self.algorithm_id,
            'technical_indicator_type': self.technical_indicator_type,
            'parameters': self.parameters,
            'block_order': self.block_order,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
