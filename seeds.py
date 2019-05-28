from pony.orm import db_session
from app import db
from models.Pool import Pool
from models.User import User, UserSchema


db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    schema = UserSchema()
    emma = User(
        username='emma',
        email='ekprice01@gmail.com',
        password_hash=schema.generate_hash('pass')
    )


    Pool(
        name='Kenwood Ladies\' Bathing Pond',
        image='https://storify.com/services/proxy/2/Wzk4uTfDIg4TLKDVtWNSjw/https/d2kmm3vx031a1h.cloudfront.net/O7p7wh3vRkGK8G70Kg6y_20170719_101823.jpg',
        description='The Kenwood Ladies’ Pond is situated on Millfield Lane on the eastern edge of Hampstead Heath.',
        type='pool',
        address='Hampstead Heath, Highgate, London NW3 1AS',
        long='51.574432',
        lat='-0.152684',
        region='London',
        heated=False,
        country='England',
        user=emma
    )

db.commit()

    # name = Required(str)
    # image = Optional(str)
    # description = Required(str)
    # type = Required(str) Type (str) (lido, sea, river, canal, lake, pond)
    # address = Required(str)
    # long_lat = Required(str)
    # region = Required(str)
    # heated = Optional(bool, default=False)
    # country = Required(str)
