from config import ma
from marshmallow import validate, validates, ValidationError, fields, validate
from models.adopt_foster import AdoptFoster

class AdoptFosterSchema(ma.SQLAlchemyAutoSchema):
    
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
        
    # Ensure the field names match the actual field names in your model
    user_id = fields.Integer(required=True)
    cat_id = fields.Integer(required=True)
    class Meta:
        model = AdoptFoster
        load_instance = True
        

adopt_foster_schema = AdoptFosterSchema()
        
adopt_fosters_schema = AdoptFosterSchema(many=True)