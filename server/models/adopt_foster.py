from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db
from .user import User
from .cat import Cat


class AdoptFoster(db.Model, SerializerMixin):
    __tablename__ = "adopt_fosters"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    cat_id = db.Column(db.Integer, db.ForeignKey("cats.id"))
    adoption_fee = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #relationship
    cat = db.relationship("Cat", back_populates="adopt_fosters")
    user = db.relationship("User", back_populates="adopt_fosters")
    
    #serialization
    serialize_rules = ("-cat.adopt_fosters", "-user.adopt_fosters",)
    
    @validates("adoption_fee")
    def validate_name(self, _, fee):
        if not isinstance(fee, int):
            raise TypeError("Adoption fee must be an integer!")
        elif fee <= 0 or fee >= 200:
            raise ValueError("Adoption fee must be greater than zero and less than 200 dollars")
        return fee
    
    @validates("user_id")
    def validate_user_id(self, _, user_id):
        if not isinstance(user_id, int):
            raise TypeError("User ids must be an integer")
        elif user_id < 1:
            raise ValueError(f"{user_id} has to be a positive integer")
        elif not db.session.get(User, user_id):
            raise ValueError(f"{user_id} has to correspond to an existing production")
        return user_id
    
    @validates("cat_id")
    def validate_user_id(self, _, cat_id):
        if not isinstance(cat_id, int):
            raise TypeError("Cat ids must be an integer")
        elif cat_id < 1:
            raise ValueError(f"{cat_id} has to be a positive integer")
        elif not db.session.get(Cat, cat_id):
            raise ValueError(f"{cat_id} has to correspond to an existing production")
        return cat_id