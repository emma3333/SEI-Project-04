from app import db
from pony.orm import Required, Optional
from marshmallow import Schema, fields
from .User import User


class Pool(db.Entity):
    name = Required(str)
    image = Optional(str)
    description = Required(str)
    type = Required(str)
    address = Required(str)
    long = Required(float)
    lat = Required(float)
    region = Required(str)
    heated = Optional(bool, default=False)
    country = Required(str)
    user = Required('User')


class PoolSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    image = fields.Str()
    description = fields.Str(required=True)
    type = fields.Str(required=True)
    address = fields.Str(required=True)
    long = fields.Float(required=True)
    lat = fields.Float(required=True)
    region = fields.Str(required=True)
    heated = fields.Str()
    country = Required(str)
    user = fields.Nested('UserSchema', exclude=('pools',))
