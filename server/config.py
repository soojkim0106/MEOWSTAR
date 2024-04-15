from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_session import Session
from flask_bcrypt import Bcrypt
from os import environ

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///meowstar.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_ECHO"] = True
app.secret_key = environ.get("SESSION_SECRET")
app.config["SESSION_TYPE"] = "sqlalchemy"
# app.config["SESSION_SQLALCHEMY_TABLE"] = "sessions"

db = SQLAlchemy(app)
app.config["SESSION_SQLALCHEMY"] = db

migrate = Migrate(app, db)
api = Api(app)
ma = Marshmallow(app)
session = Session(app)
flask_bcrypt = Bcrypt(app)