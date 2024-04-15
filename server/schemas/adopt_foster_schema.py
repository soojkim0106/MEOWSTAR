from config import ma
from marshmallow import validate, validates, ValidationError, fields, validate
from models.adopt_foster import AdoptFoster

class AdoptFosterSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = AdoptFoster
        load_instance = True
        
        cat = fields.Nested(
            "CatSchema",
            only=("id", "name"),
            exclude=("user",),
            many=True,
        )
        
        user = fields.Nested(
            "UserSchema",
            only=("id", "username", "email"),
            exclude=("cat",),
            many=True,
        )
        
        adoption_fee = fields.Integer(validate=validate.Range(min=0, max=250))
        user_id = fields.Integer(required=True)
        cat_id = fields.Integer(required=True)
        
adopt_foster_schema = AdoptFosterSchema()
        
adopt_fosters_schema = AdoptFosterSchema(many=True)