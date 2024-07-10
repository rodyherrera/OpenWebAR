from mongoengine import Document, StringField

class User(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    hashed_password = StringField(required=True)