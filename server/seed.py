#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from config import db
from models.user import User
from models.cat import Cat
from models.adopt_foster import AdoptFoster

# fake = Faker()

# if __name__ == '__main__':
with app.app_context():
    # Seed code goes here!
    AdoptFoster.query.delete()
    User.query.delete()
    Cat.query.delete()

    c1 = Cat(
        name="Whiskers",
        age=7,
        gender="Male",
        breed="Persian",
        temperament="Calm",
        image= "persian.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c2 = Cat(
        name="Mittens",
        age=3,
        gender="Female",
        breed="Siamese",
        temperament="Playful",
        image= "siamese.jpg",
        good_with_children=True,
        good_with_animal=False,
        availability=True,
        fixed=True
    )
    c3 = Cat(
        name="Pickles",
        age=5,
        gender="Female",
        breed="Maine Coon",
        temperament="Friendly",
        image= "maine_coon.jpg",
        good_with_children=False,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c4 = Cat(
        name="Socks",
        age=2,
        gender="Male",
        breed="Scottish Fold",
        temperament="Timid",
        image= "scottish_fold.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c5 = Cat(
        name="Luna",
        age=1,
        gender="Female",
        breed="Bengal",
        temperament="Energetic",
        image="bengal.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c6 = Cat(
        name="Milo",
        age=6,
        gender="Male",
        breed="Tabby",
        temperament="Affectionate",
        image="tabby.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c7 = Cat(
        name="Oreo",
        age=4,
        gender="Female",
        breed="American Shorthair",
        temperament="Independent",
        image="american_shorthair.jpg",
        good_with_children=False,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c8 = Cat(
        name="Shadow",
        age=1,
        gender="Male",
        breed="Russian Blue",
        temperament="Curious",
        image="russian_blue.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c9 = Cat(
        name="Sauce",
        age=2,
        gender="Male",
        breed="Ragdoll",
        temperament="Gentle",
        image="ragdoll.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c10 = Cat(
        name="Gom",
        age=3,
        gender="Female",
        breed="Tuxedo",
        temperament="Mischievous",
        image="gom_tuxedo.jpg",
        good_with_children=True,
        good_with_animal=False,
        availability=True,
        fixed=True
    )
    c11 = Cat(
        name="Semo",
        age=1,
        gender="Male",
        breed="Tuxedo",
        temperament="Playful",
        image="semo_tuxedo.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c12 = Cat(
        name="Smokey",
        age=4,
        gender="Male",
        breed="Norwegian Forest Cat",
        temperament="Reserved",
        image="norwegian_forest.jpg",
        good_with_children=False,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c13 = Cat(
        name="Inky",
        age=2,
        gender="Female",
        breed="Himalayan",
        temperament="Sweet",
        image="himalayan.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c14 = Cat(
        name="Fabio",
        age=3,
        gender="Male",
        breed="Tabby",
        temperament="Quirky",
        image="orange.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=True
    )
    c15 = Cat(
        name="Henry",
        age=2,
        gender="Female",
        breed="Tuxedo",
        temperament="Loyal",
        image="henry_tuxedo.jpg",
        good_with_children=True,
        good_with_animal=False,
        availability=True,
        fixed=True
    )
    c16 = Cat(
        name="Dweji",
        age=4,
        gender="Male",
        breed="Tuxedo",
        temperament="Adventurous",
        image="dweji_tuxedo.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c17 = Cat(
        name="Ralph",
        age=15,
        gender="Male",
        breed="Maine Coon",
        temperament="Charming",
        image="ralph_maine_coon.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c18 = Cat(
        name="Mochi",
        age=1,
        gender="Female",
        breed="Siamese",
        temperament="Playful",
        image="mochi_siamese.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c19 = Cat(
        name="Curly",
        age=6,
        gender="Male",
        breed="Sphynx",
        temperament="Curious",
        image="hairless.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    c20 = Cat(
        name="Lola",
        age=12,
        gender="Female",
        breed="Ragdoll",
        temperament="Elegant",
        image="lola_ragdoll.jpg",
        good_with_children=True,
        good_with_animal=True,
        availability=True,
        fixed=False
    )
    cats = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20]
    db.session.add_all(cats)
    db.session.commit()
    
    u1 = User(
        username="gabriellarichmo",
        email="gab@email.com",
        isAdmin=1,
        interest="All things fluffy",
        _password_hash="password"
    )
    u2 = User(
        username="gamjaa",
        email="sooj@email.com",
        isAdmin=1,
        interest="Big chonkers",
        _password_hash="password"
    )
    users = [u1, u2]
    db.session.add_all(users)
    db.session.commit()


    print("Completed seeding...")