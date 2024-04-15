from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import flask_bcrypt, db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    isAdmin = db.Column(db.Integer, default=False)
    _password_hash = db.Column(db.String, nullable=False)
    interest = (db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    #relationship
    cats = association_proxy("adopt_fosters", "cat")
    adopt_fosters = db.relationship("AdoptFoster", back_populates="user", cascade="all, delete-orphan")
    
    #serialization
    serialize_rules = ("-_password_hash", "-adopt_fosters.user",)
    
    def __repr__(self):
        return f"<User {self.id}: {self.username} | {self.email}/>"
    
    #! PASSWORD HASHING AND AUTHENTICATING
    @hybrid_property
    def password_hash(self):
        raise AttributeError("You cannot view password >:(!")
    
    @password_hash.setter
    def password_hash(self, new_password):
        #! Validate
        if len(new_password) < 5:
            raise ValueError("Password is not long enough")
        hashed_password = flask_bcrypt.generate_password_hash(new_password).decode('utf-8')
        self._password_hash = hashed_password

    def authenticate(self, password):
        return flask_bcrypt.check_password_hash(self._password_hash, password)
    
    @validates("username")
    def validate_username(self, _, username):
        if not isinstance(username, str):
            raise TypeError("Username must be a string!")
        elif len(username) > 20:
            raise ValueError("Username must be less than 20 characters")
        return username