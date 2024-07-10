from mongoengine import Document, StringField, ListField, ReferenceField
from .user import User

class Object(Document):
    name = StringField(required=True, max_length=32, min_length=4)
    description = StringField(required=True, max_length=255, min_length=4)
    samples = ListField(StringField())
    user = ReferenceField(User, required=True)