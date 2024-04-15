from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db

class Cat(db.Model, SerializerMixin):
    __tablename__ = "cats"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(15), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String)
    breed = db.Column(db.String)
    temperament = db.Column(db.String)
    image = db.Column(db.String)
    good_with_children = db.Column(db.Boolean)
    good_with_animal = db.Column(db.Boolean)
    availability = db.Column(db.Boolean)
    fixed = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #relationship
    users = association_proxy("adopt_fosters", "user")
    adopt_fosters = db.relationship("AdoptFoster", back_populates="cat", cascade="all, delete-orphan")
    
    #serialization
    serialize_rules = ("-adopt_fosters.cat",)
    
    def __repr__(self):
        return f"""<Cat {self.id}: 
                        Name: {self.name},
                        Age: {self.age}, 
                        Gender: {self.gender}, 
                        Breed: {self.breed},
                        Temperament: {self.temperament},
                        Availability: {self.availability},
                        Fixed: {self.fixed},
                        Good with Children?: {self.good_with_children},
                        Good with Other Animal(s)?: {self.good_with_animal}
                        />
                        """

    @validates("name")
    def validate_name(self, _, name):
        if not isinstance(name, str):
            raise TypeError("Name must be a string!")
        elif not (2 < len(name) < 15):
            raise ValueError("Name must be at least 2 characters and less than 15 characters")
        return name

    @validates("age")
    def validate_name(self, _, age):
        if not isinstance(age, int):
            raise TypeError("Age must be an integer!")
        elif not (age < 20):
            raise ValueError("Age must be below 20")
        return age