from datetime import datetime
from app import db
from pony.orm import Required, Optional, Set
from marshmallow import Schema, fields, post_load

class Comment(db.Entity):
    content = Required(str)
    created_at = Required(datetime, default=datetime.utcnow)
    pool = Required('Pool')
    user = Required('User')

class CommentSchema(Schema):
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True)
    created_at = fields.DateTime(format='%Y-%m-%d %H:%M:%S')
    user = fields.Nested('UserSchema', exclude=('pools', 'starred_pools'))

class Pool(db.Entity):
    name = Required(str, unique=True)
    image = Optional(str)
    description = Required(str)
    type = Required(str)
    address = Required(str)
    lng = Required(float)
    lat = Required(float)
    region = Required(str)
    heated = Optional(bool, default=False)
    country = Required(str)
    user = Required('User', reverse='pools')
    comments = Set('Comment') # describes the one to many relationship
    starred_by = Set('User', reverse='starred_pools') # describes many to many relationship

class PoolSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    image = fields.Str()
    description = fields.Str(required=True)
    type = fields.Str(required=True)
    address = fields.Str(required=True)
    lng = fields.Float(required=True)
    lat = fields.Float(required=True)
    region = fields.Str(required=True)
    heated = fields.Str()
    country = fields.Str(required=True)
    user = fields.Nested('UserSchema', exclude=('pools', 'starred_pools', 'comments'))
    comments = fields.Nested('CommentSchema', many=True)
