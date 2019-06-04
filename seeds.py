from pony.orm import db_session
from app import db
from models.Pool import Pool, PoolSchema, Comment, CommentSchema
from models.User import User, UserSchema


db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():
    schema = UserSchema()
    emma = User(
        username='Emma',
        email='ekprice01@gmail.com',
        password_hash=schema.generate_hash('pass'),
        image='https://pbs.twimg.com/profile_images/639532874740404225/EJlcwETM_400x400.jpg'
    )

    amy = User(
        username='Amy',
        email='amy@gmail.com',
        password_hash=schema.generate_hash('pass'),
        image='https://pbs.twimg.com/profile_images/726724811293085696/cyQw1WFQ_400x400.jpg'
    )

    george = User(
        username='George',
        email='george@gmail.com',
        password_hash=schema.generate_hash('pass'),
        image='https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/10644956_10152843839016159_5845249356064376143_n.jpg?_nc_cat=110&_nc_ht=scontent-lhr3-1.xx&oh=29baade9b102d375d0d3e29951771941&oe=5D5B4328'
    )

    pool_one = Pool(
        name='Kenwood Ladies\' Bathing Pond',
        image='https://storify.com/services/proxy/2/Wzk4uTfDIg4TLKDVtWNSjw/https/d2kmm3vx031a1h.cloudfront.net/O7p7wh3vRkGK8G70Kg6y_20170719_101823.jpg',
        description='Hampstead has three different ponds for swimming: one for men, one for women and one mixed. Only swimmers over eight years of age are allowed; those between eight and 15 years old must be in the care of an adult. Winter swimming is sometimes available at the ponds, which remain popular with users. The Kenwood Ladies’ Pond is situated on Millfield Lane on the eastern edge of Hampstead Heath.',
        type='Pond',
        address='Hampstead Heath, Highgate, London NW3 1BP',
        lng='-0.160377',
        lat='51.566891',
        region='Greater London',
        heated=False,
        country='England',
        user=emma
    )

    pool_two = Pool(
        name='Serpentine Lido',
        image='https://secretldn.com/wp-content/uploads/2018/05/Serpentine-Lido.jpg',
        description='The lake is used all year around by the Serpentine Swimming Club and users of the Serpentine Lido. Regular triathlete sessions also take place.',
        type='Lido',
        address='Hyde Park, London, W2 2UH',
        lng='-0.165690',
        lat='51.507721',
        region='Greater London',
        heated=False,
        country='England',
        user=emma
    )

    pool_three = Pool(
        name='Portobello Beach',
        image='https://www.contiki.com/six-two/wp-content/uploads/2016/03/wild-swimming-edinburgh-header.jpg',
        description='The triathlon branch of the Edinburgh Road Club runs Friday night sessions on Portobello beach from May to October.',
        type='Coastal',
        address='Edinburgh, EH15',
        lng='-3.117045',
        lat='55.958451',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_four = Pool(
        name='Stonehaven Open Air Pool',
        image='https://www.pressandjournal.co.uk/wp-content/uploads/sites/2/2015/07/Stonehaven-Swimming-Pool.jpg',
        description='Seawater (fully filtrated) heated lido, 50m x 18m, built in 1930s art deco style, and painted in primary colours to look cheerful even when its pouring with rain. Offers weekly floodlit midnight swims.',
        type='Lido',
        address='Queen Elizabeth Park, Aberdeen, AB39 2RD',
        lng='-2.208420',
        lat='56.968571',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_five = Pool(
        name='New Cumnock Swimming Pool',
        image='https://images-e.jpimedia.uk/imagefetch/w_700,f_auto,ar_3:2,q_auto:low,c_fill/if_h_lte_200,c_mfit,h_201/https://www.scotsman.com/webimage/1.4558959.1505316094!/image/image.jpg',
        description='Freshwater heated pool, 23m x 12m, built in the 1960s.',
        type='Lido',
        address='22 Castle, New Cumnock, Cumnock, KA18 4AN',
        lng='-4.184658',
        lat='55.396191',
        region='Scotland',
        heated=True,
        country='Scotland',
        user=emma
    )

    pool_six = Pool(
        name='Ilkley Pool and Lido',
        image='https://lh3.googleusercontent.com/2WAKwSWs22QEBuQ-fq3c2ypLaT5DIfDwpccj9peSIFwqeMyJ2AFtBiWNUgpcT1ypjEz9-Sw=w1080-h608-p-no-v0',
        description='Situated on the edge of Ilkley Moor and surrounded by wide open countryside, this freshwater lido is circular (46cm in diameter) with a central foundtain and slide. There is a smaller heated pool on site.',
        type='Lido',
        address='Denton Road, Ilkley, LS29 0BZ',
        lng='-1.819177',
        lat='53.932506',
        region='Yorkshire and the Humber',
        heated=False,
        country='England',
        user=emma
    )

    pool_seven = Pool(
        name='Parliament Hill Fields Lido',
        image='https://48cdp72nsn98y4xzwvlsdhp1-wpengine.netdna-ssl.com/wp-content/uploads/sites/13/2018/04/Lido4.jpg',
        description='Grade II listed in January 1999 as one of the finest surviving exampels of a 1930s lido left in the UK. 70m x 30m and was fitted with a unique steel lining in 2005 which twinkles at swimmers as they plough up and down, changing the colour of the water with the daylight, from pale green and pale blue to silvery grey. Wonderful geometric simplicity and open all year. Unheated.',
        type='Lido',
        address='Gordon House Road, Hampstead, London, NW5 1LP',
        lng='-0.148416',
        lat='51.556147',
        region='Greater London',
        heated=False,
        country='England',
        user=emma
    )

    pool_eight = Pool(
        name='Llyn Hywel, Snowdonia',
        image='https://wildswim.com/imageprocessor/e717e298-34d7-47e6-a976-9aa1095948e0.jpg?width=800&height=480&mode=crop',
        description='Lakes and tarns are never move spectacular than when hidden away, and this very wild, very high tarn can only be reached after about an hour\'s walk, nestled between two of the higest peaks in the Rhinog mountains.',
        type='Lake',
        address='Llyn Hywel, Snowdonia, Gwynedd, LL45 2PL',
        lng='-4.055620',
        lat='52.840279',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_nine = Pool(
        name='Jubilee Pool',
        image='https://www.cornwalls.co.uk/sites/default/files/photos/jubilee_pool_0.jpg',
        description='Sea Pool, 100m x 73m on its longest axis. Includes a \'baby pool\' within the main pool for kids. The \'Poolside cafe\' next door serves coffee, lunch and suppers.',
        type='Lido',
        address='The Promenade Penzance',
        lng='-5.532032',
        lat='50.115202',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_ten = Pool(
        name='Marbury Park Open Air Pool',
        image='https://www.warringtonguardian.co.uk/resources/images/7990695.jpg?type=article-full',
        description='30m pool in Marbury Country Park. Swimmers are asked to become members of Marbury Park Swimming Club and join for a season.',
        type='Lido',
        address='Marbury Park Open Air Pool, Marbury, Northwich, CW9 6AT',
        lng='-2.528206',
        lat='53.283491',
        region='North West',
        heated=False,
        country='England',
        user=emma
    )

    pool_eleven = Pool(
        name='Mermaid\'s Pool',
        image='https://www.historic-uk.com/wp-content/uploads/2017/01/mermaids-at-mermaids-pool.jpg',
        description='Mermaid’s Pool is a small pool on Kinder Scout in Derbyshire, England, which, according to legend, is inhabited by a beautiful mermaid who can be seen if you look into the water at sunrise on Easter Sunday. It is also said that its water is salty due to its being connected by an underground passage to the Atlantic.',
        type='Pond',
        address='Hayfield, High Peak, S33 7ZJ',
        lng='-1.846999',
        lat='53.364384',
        region='North West',
        heated=False,
        country='England',
        user=emma
    )

    pool_twelve = Pool(
        name='Janet\'s Foss',
        image='https://wildswim.com/imageprocessor/b3c9bcda-06cb-4b1d-af65-136eba25c0e8.jpg?width=800&height=480&mode=crop',
        description='A stunning small pool for a chilly dip. Sit on the sandy beach to take in the sounds of the waterfall before plunging in. Perfect for floating and watching the clouds and trees overhead, the waterfall is almost a roar with your ears under the water.',
        type='Pond',
        address='Janet\'s Foss, Skipton, BD23 4DL',
        lng='-2.135150',
        lat='54.066898',
        region='North West',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirteen = Pool(
        name='Brockwell Lido',
        image='https://www.brockwellswimmers.com/wp-content/uploads/2018/02/Brockwell_Lido3-977x720.jpg',
        description='Brockwell Lido is a large lido in Brockwell Park, Herne Hill, London. It opened in July 1937, closed in 1990 and after a local campaign was re-opened in 1994.',
        type='Lido',
        address='Dulwich Rd, London SE24 0PA',
        lng='-0.110520',
        lat='51.455470',
        region='Greater London',
        heated=False,
        country='England',
        user=emma
    )

    pool_fourteen = Pool(
        name='Llyn D\'ur Arddu',
        image='https://wildswim.com/imageprocessor/b2efef43-3bae-4215-bb6d-13ceaf385e11.jpg?width=800&height=480&mode=crop',
        description='Access gained via the Llanberis Path to this crystal clear turquoise and azure blue lake. A popular spot for local climbers.',
        type='Pond',
        address='Llyn D\'ur Arddu, Gwynedd, Snowdonia, LL55 4UL',
        lng='-4.09052191',
        lat='53.08050156',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_fifteen = Pool(
        name='Loch Morar',
        image='https://wildswim.com/imageprocessor/80f045ea-d6c3-44d1-8382-53aa5787b18f.jpg?width=800&height=480&mode=crop',
        description='If you are into the nature of Scotland, this is a great out of the way place that few tourists ever find. A jewel on the west coast, and easy to access for a day trip if you are staying in Arasaig or Mallaig, or just stopping before a ferry to the islands.',
        type='Lake',
        address='Loch Morar, Morar, Mallaig, PH40 4PE, Scotland',
        lng='-5.763980',
        lat='56.971160',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_sixteen = Pool(
        name='Camusdarrach Beach',
        image='https://wildswim.com/imageprocessor/de0b1fa8-7cb8-4170-be44-0e817896b3a9.jpg?width=800&height=480&mode=crop',
        description='With a spectacular view to the jagged crest of Cuillin on the Isle of Skye, the rugged blue peaks of Rum and the steep sea cliff of Eigg, Camusdarach is breathtaking. With plenty of opportunities for swimming, rock pooling and walking, the beach is a great place to spend a day. Camusdarach is the beach featured in the film Local Hero and is a popular place on tours of film locations.',
        type='Coastal',
        address='Camusdarrach Beach, Arisaig, PH39 4NT, Scotland',
        lng='-5.858690',
        lat='56.931670',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_seventeen = Pool(
        name='Portishead Lido',
        image='https://wildswim.com/imageprocessor/d239e95b-c7d8-46c0-a326-eeb94a70cb99.jpg?width=800&height=480&mode=crop',
        description='Portishead Open Air Pool aka Portishead Lido is an open air pool built in 1962, 33m x 12.5, with stunning views of the Severn estuary and saved from closure by the local community in 2008. It is heated from April to September.',
        type='Lido',
        address='Portishead Lido, The Esplanade, Portishead, BS20 9HD',
        lng='-2.772200',
        lat='51.493260',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_eighteen = Pool(
        name='Margate Tidal Pool',
        image='https://tr-images.condecdn.net/image/PDNr23lwoO1/crop/1620/f/walpole-bay-tidal-pool-margate-kent-conde-nast-traveller-17aug17-historic-england.jpg',
        description='Margate tidal pool is quite a walk from the Railway Station, but worth it. From the station, walk north to the sandy beach and then walk east. You will see other pools on sandy beaches before you get here but these appear to be exclusively boating ponds with big "NO SWIMMING" notices.',
        type='Coastal',
        address='Walpole Bay, Margate, CT9 2JJ, England',
        lng='1.403980',
        lat='51.391150',
        region='East of England',
        heated=False,
        country='England',
        user=emma
    )

    pool_nineteen = Pool(
        name='Pells Pool',
        image='https://media.dayoutwiththekids.co.uk/media/17419/34259-the-pells-outdoor-swimming-pool-lewes-01.jpg?anchor=center&mode=crop&quality=75&width=834&height=467',
        description='This 1860s Grade II-listed pool is the oldest freshwater pool in the country - only Lymington\'s sea water pool is older (1833). 40m x 20m with a paddling pool and grassy areas for sunbathing.',
        type='Lido',
        address='Pells Pool, Brook St, Lewes, BN7 2BA',
        lng='0.010780',
        lat='50.876660',
        region='South East',
        heated=False,
        country='England',
        user=emma
    )

    pool_twenty = Pool(
        name='Guilford Lido',
        image='https://upload.wikimedia.org/wikipedia/commons/c/c8/Lido1_edited_640.jpg',
        description='1930s lido, 50m x 28m, set in three acres of landscaped gardens at Stoke Park. Heated and in the middle of Guildford. There are paddling pools, water slides and free parking.',
        type='Lido',
        address='Lido Rd, Stoke Park, Guildford, GU1 1HB',
        lng='-0.571550',
        lat='51.243290',
        region='South East',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentyone = Pool(
        name='Treyarnon Tidal Pool',
        image='https://wildswim.com/imageprocessor/e6a68da4-fc04-4f58-bef3-d1cba5eb65ed.jpg?width=800&height=480&mode=crop',
        description='Just six seven minutes around the corner from Constantine Bay on the coast path lies a pool-size tidal pool in the rocks. The biggest has a wall of concrete to keep water levels high, but just below it is a small deep plunge pool. Great for swimming, diving, paddling and snorkeling.',
        type='Coastal',
        address='Treyarnon Tidal Pool, Cornwall, PL28 8JR',
        lng='-5.020910',
        lat='50.527230',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentytwo = Pool(
        name='Woody Bay Rock Pool',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885708_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=1400',
        description='Exmoor\'s coast is wild and precipitous with 250m-high cliffs hiding secret coves and lagoons. Descend to Woody Bay to find a cobbled track that winds down past an ancient limekiln to a bouler-strewn beach and waterfall. Hidden at the far eas end is a natural rock pool. Look more carefully and you\'ll see the remains of the old pier, the only remains of a grand resort that the Victorians once planned for this remote piece of coast. Find the lay-by car park on the lower arm of the lynton to Martinhoe Lane. Walk down the switchback track, signed Martinhoe manor, about 20 minutes.',
        type='Coastal',
        address='Woody Bay Rock Pool, Exmoor',
        lng='-3.8949',
        lat='51.2248',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentythree = Pool(
        name='River Stour, Wimborne Minster',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885201_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=1400',
        description='The Romas were very good swimmers - it was a requirement of joining the army - and the old Roman ford near wimborne Minster must have been delightful even in their day. There\'s a large space to paddle by the small weir. Upstream there is a footbridge and the water deepend with cow parsley and meadowsweet along the banks. Nearby is the Roman fort of Babury Rings and the National Trust park at Kingston Lacy. Seek out Barford farm with its homemade ice cream in Sturminster Marshall (more river swimming here). Take the B3082 (Blandford) from Wimborne and turn left down Cowgrove Road, signposted to the football club. Continue 3/4 mile to find a small parking area and river on the left.',
        type='River',
        address='River Stour, Wimborne Minster, Dorset',
        lng='-2.0076',
        lat='50.8000',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentyfour = Pool(
        name='Chagford river-fed swimming pool',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/Capture_trans_NvBQzQNjv4BqL0WwcwovDZdsvPPBqc6OJv5donmmBAmIq3q37YHzNiU.PNG?imwidth=1400',
        description='Deep in Dartmoor, this outdoor swimming pool is fed by the river Teign, straight off the moor. It was dug in 1947 as a co-operative effort by the village and some of the original old boys still come down to make tea. these days it has solar heaters and an indoor cafe. There is also good river swimmiong at the salmon leaps, and above the weir.',
        type='Lido',
        address='Chagford, Dartmoor, TQ13 8DA',
        lng='-3.8326',
        lat='50.6808',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentyfive = Pool(
        name='Grantchester Meadows',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885138_trans_NvBQzQNjv4Bqeoh6R_Asy6TV7Mp4S1i8Pctl4wH-QVoA1_nWU5B-emI.jpeg?imwidth=1400',
        description='On hot summer days it can seem like little has changed since Edwardian times, when Rupert Brooke was a Grantchester resident and bathed naked with Virginia Woolf. The Cam flows merrily past picnic parties, punts and swimmer, some heading downstream to Cambridge\'s Backs, others heading upstream to the Orchard Tea Garden in Grantchester. Deep banks make this good for diving, but it can be muddy! From the tea garden in Grantchester (CB3 9ND), explore upstream, or take a longer walk downstream from Sheep\'s Green (about 20 minutes).',
        type='River',
        address='Grantchester Meadows, Cambridge, CB3 9ND',
        lng='0.1046',
        lat='52.1907',
        region='East of England',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentysix = Pool(
        name='River Ouse, Barcombe Mills',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885187_trans_NvBQzQNjv4BqplGOf-dgG3z4gg9owgQTXPGkjMqXV6CT_ASrwFoxoSc.jpeg?imwidth=1400',
        description='Just in sight of the Sussex Downs, the Ouse runs deep through open pasture. There are grassy banks, ideal for jumping and diving, and it\'s a perfect place for other riverside games. Rent a little blue rowing boat from the Anchor Inn and explort for more than two miles through remote countryside - the spire of Isfield church is the only building you will see the entire length of. Two miles north of Lewes on A26, turn left, signed Barcombe. Find a car park on the right after a mile, and head upstream past sluices to the meadow.',
        type='River',
        address='River Ouse, Barcombe Mills, East Sussex, BN8 5EA',
        lng='0.0411',
        lat='50.9151',
        region='South East',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentyseven = Pool(
        name='River Thames, Buscot',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-14-39_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=1400',
        description='This is the Thames at its most idyllic. The old weir at Buscot has scooped out a deep natural pool lined with ancient weeping willow. Children climb the low boughs and use them as platforms to jump from, and rope swings hang everywhere. The deep roots make perfect handrails to pull yourself out and the lawns that border the pool are dotted with inflatable boats and deckchairs. Upstream Cheese Wharf (a good palce for diving) was once a loading bay for 20 tons of cheese a day. Two miles east of Lechlade on the A417, turn left for Buscot by the mirror, signposted visitor parking.',
        type='River',
        address='River Thames, Buscot, Cotswolds',
        lng='-1.6683',
        lat='51.6809',
        region='South East',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentyseven = Pool(
        name='River Wey, Surrey',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136886418_trans_NvBQzQNjv4BqaBJSHwufYM_Fh0ArUj1hequZKfEZf-DZHA_hrv9jmkk.jpeg?imwidth=1400',
        description='Surrey is surprisingly rural despite being so close to London. It\'s England\'s most wooded county and sports some excellent wild swimming along the River Wey. There are sandy beaches and banks where the North Downs Way crosses the river just south of Guilford, near Shalford, but for the most rural escape head for the beautiful meanders and meadows on the common near Old Woking. You can explore all the way downstream as far as the ruined priory on an island at Newark. From Old Working roundabout, head south on the A247 (Broadmead Road) towards Send. 200m on the left is a footpath. Follow this 300m to the first meander.',
        type='River',
        address='River Wey, Surrey',
        lng='-0.5355',
        lat='51.2993',
        region='South East',
        heated=False,
        country='England',
        user=emma
    )

    pool_twentyeight = Pool(
        name='Lady Falls',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-13-36_trans_NvBQzQNjv4Bq7fJ7jj8-gj7ZXzs1a_mNLVVopz-tW2eyJA-NX9znS20.png?imwidth=1400',
        description='Mosses and ferns grow in profusion in this misty rainforest microclimate. A slender chute tumbles 30ft into a large plunge pool set in a huge wooded amphitheatre. There is a pebble beach and you can climb behind the falls and dive back in. The adventurous can explore upstream to Einion Gam, ones of Wales\'s tallest waterfalls. There are more waterfall pools on the main river Nedd Fechan, up to the bridge at Pont Melin-fach. Pontneddfechan is north of Swansea on the A465. Park at the visitor centre and follow the wooder river path behind the Angel Inn for about 20 minutes; go left at the footbridge.',
        type='River',
        address='Lady Falls, Waterfall Woods, Brecon Beacons',
        lng='-3.6011',
        lat='51.7714',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_twentynine = Pool(
        name='Llangennith Blue Pool',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885164_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt7rBiwLVv-x2UIIDI2Y-giA.jpeg?imwidth=1400',
        description='Said to be bottomless, this giant-tub shaped tidal rock pool sits in the corner of one of Gower\'s most beautiful beaches. You can jump and drive into indigo water from high ledges. The Three Chimneys Cave arches mark the furthest reach of the bay, and it is said that Portuegese and Brazilian gold coins can still be found washed up from an ancient shipwreck. Park at the entrance to Broughton Farm Caravan Park, Llangennith (SA3 1JP), and head west on the coast path to find the bay after 3/4 mile.',
        type='Coastal',
        address='Llangennith Blue Pool, Gower',
        lng='-4.2986',
        lat='51.6141',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_thirty = Pool(
        name='Blue Lake of Golwern',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885123_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=1400',
        description='Disused slate quarries often fill with clear spring water, glinting like cobalt jewels on the mountainside. One of the most popular and safest is at Golwern Quarry, with wonderful views out from high above the Mawddach estuary. The water is access via a short tunnel that quickly opens out into a sheltered amphitheatre. This pool is almost perfectly rectangular with smooth straigh rock walls that make it as close to a natural swimming pool as you wish. Just south of Friog/Fairbourne Church, turn left at the telephone box and up the lane 1/3 mile to find a footpath and gate of the right.',
        type='Lake',
        address='Blue Lake of Golwern, Snowdonia',
        lng='-4.0413',
        lat='52.6891',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_thirtyone = Pool(
        name='Hatchmere Lake',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-13-53_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=1400',
        description='The West Midlands\' meres and mosses are some of the last reminaing fragments of ancient peat bogs in the country - remnants of hollows formed during out glacial past. Hatchmere, nestled in a corner of the Delamere Forst Park, forms a serence, reed-banked lagoon that has been popular with wild swimmers for generations. A small bay leads to sandy shallows where jewel-blue dragonflies whirr low over the water\'s surface. Six miles south of the M56(J12) on B5152. Find the beach next to The Carrier\'s Inn (WA6 6NL). There are many woodland walks and bike rides nearby.',
        type='Lake',
        address='Hatchmere Lake, Delemere Forest, Cheshire',
        lng='-2.6698',
        lat='53.2446',
        region='West Midlands',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirtytwo = Pool(
        name='Three Shires Head Waterfall',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/1280px-Three_Shire_trans_NvBQzQNjv4BqUgehH7knIs2mL4LO-crfgu0JcK6kii4EZo4SCKDPAyk.jpg?imwidth=1400',
        description='At the meeting of three counties, high in the Peak District at the headwaters of the River Dane, there\'s a creek that gushes down the hill along grassy banks before dropping into a pool beneath two medieval bridges. It\'s notorious no-man\'s land that once attracted brigands excaping the law. Follow the stream down to a wild plunge pool and enjoy a pummelling from the stream - and amazing views. Just off the A53 Leek-Buxton road, start your walk from the New Inn pub in Flash(SK17 0SW), the highest village in England. Take the footpath at Spring Head Farm.',
        type='River',
        address='Three Shires Head Waterfall, Peak District',
        lng='-1.9869',
        lat='53.2138',
        region='North West',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirtythree = Pool(
        name='Welford-on-Avon',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/19421185_trans_NvBQzQNjv4BqNvLtDx75wZSR0MSb26ou_4pIMotykyGm1vIbIiII8w8.jpg?imwidth=1400',
        description='Sporting one of the tallest maypoles in England, and a lovely pub, Welford sits in a wide loop of our most quintessentially English river. A line of thatched cottages leads to a river path with a weir and green banks upstream. Follow the path all the way to Stratford and take you pick of places. Four miles west of Stratford. From the Bell Inn (CV37 8EB), pass the church and follow Boat Lane.',
        type='River',
        address='Welford-on-Avon, Warwickshire',
        lng='-1.7910',
        lat='52.1679',
        region='West Midlands',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirtyfour = Pool(
        name='Tongue Pot',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-13-59_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=1400',
        description='The 15-mile Esk valley is renowned for its magical \'tubs\' and \'dubs\'. The higher you go the more dramatic the pools and waterfalls are, so seek out Tongue Pot, with emerald water set beneath an ancient packhorse bridge. High jumps are possible and you can sample various rock pools. Above are more great pools, including Esk Waterfall and Lingcove Beck. Park by the telephone at the bottom of Hardknott Pass and follow the riverside path up through Brotherilkeld Farm for two miles, to reach the confluence and bridge.',
        type='River',
        address='Tongue Pot, Eskdale, Lake District',
        lng='-3.1907',
        lat='54.4236',
        region='North West',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirtyfive = Pool(
        name='Gormire Lake',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/TELEMMGLPICT000136885617_trans_NvBQzQNjv4BqpVlberWd9EgFPZtcLiMQfyf2A9a6I9YchsjMeADBa08.jpeg?imwidth=1400',
        description='James Herriot thought Sutton Bank the finest view in England, with vistas out as far as the Dales. Down the escarpment is Gormire Lake, cradled by ancient woods, a tarn formed by glacial erosion 20,000 years ago. This is a secluded palce, the water is smooth and bird life is abundant. Head east from Thirsk on the A170. From the main Sutton Bank car park walk along the escarpment and after 300 yards follow nature reserve signed, descending via the track on the left.',
        type='Lake',
        address='Gormire Lake, North Yorkshire Moors',
        lng='-1.2283',
        lat='54.2427',
        region='Yorkshire and The Humber',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirtysix = Pool(
        name='River Tay',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-14-5_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=1400',
        description='Tayside once had as many distilleries as Speyside and to many Aberfeldy is still the spiritual home of Scotch. Golden in the sun, the Tay runs sweet and peaty here and bathing in it as close as you\'ll get to swimming in whisky itself. From its Trossachs source, it is warmed by shallow lochs that act as great solar collectors. Head upstream for pebble beaches or enjoy the little bay by the town centre. Easy entry coming into Aberfeldy from the west, or dip in the Loch Tay at Dalerb, in the Tay Forest Park near Kenmore.',
        type='River',
        address='River Tay, Aberfeldy, Perthshire',
        lng='-3.8769',
        lat='56.6178',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_thirtyseven = Pool(
        name='Fairy Pools',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-14-9_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=1400',
        description='The pools of Allt Coir\' a\'Mhadaidh are sculpted from lilac-tinged volcanic lava sheltered in glades fringed with rowan trees. The misty towers of the Black Cuillin kingdom rise above like something from Mordor. The water is so clear you have to stare to see if it\'s there. There are good jumps for older kids and even an underwater arch. Follow the A863/B8009 and turn left (Glen Brittle) just before Carbost (Talisker Distillery). The Fairy Pools car park is on the right. Cross the road and go upstream for 3/4 mile.',
        type='Pond',
        address='Fairy Pools, Isle of Skye',
        lng='-6.2554',
        lat='57.2497',
        region='Scotland',
        heated=False,
        country='Scotland',
        user=emma
    )

    pool_thirtyeight = Pool(
        name='Treyarnon Rock Pool',
        image='https://www.telegraph.co.uk/content/dam/health-fitness/2017/08/11/ss-composite-image-2017-8-11-12-59_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.png?imwidth=1400',
        description='Up in the rocks along the north edge of the beach, Treyarnon rock pool is a magical place for children to learn to swim and snorkel. It is entirely natural and refilled each high tide with fresh seawater, and a new starfish or two. In some parts it\'s deep enough to dive into. The YHA cafe above has warming drinks and food for afterwards. Constantine Bay to the north is a classic surf beach and leads on to Trevose Head round Hole, an intriguing collapsed sea cave and blowhole. From the car park follow the coat path. The rock pool is 50 yards past the YHA, PL28 8JP.',
        type='Pond',
        address='Treyarnon Rock Pool, North Cornwall, PL28 8JP',
        lng='-5.0250',
        lat='50.5280',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_thirtynine = Pool(
        name='St Nectan\'s Kieve',
        image='https://www.telegraph.co.uk/content/dam/Travel/2018/June/St-Nectan%E2%80%99s-Kieve-iStock-640219898.jpg?imwidth=1240',
        description='Swimming there: At the head of a wild glen a tall, slender waterfall falls into a high basin, flows through a circular hole and drops into a plunge pool (the kieve). This is a holy place with prayer flags, a shrine room above and lots of steps. There is a small tea room in the hermitage. An entrance fee applies. Getting there: Locate the track with a postbox, opposite a telephone box, on the B3263 in Trethevey, two miles east of Tintagel. Bear right and follow it for one mile, past St Piran’s Well, down into the woods, and up along a pretty stream, finally climbing the steps up to the shrine entrance (20 mins).',
        type='River',
        address='St Nectan\'s Kieve, Tintagel',
        lng='-4.7168',
        lat='50.6644',
        region='South West',
        heated=False,
        country='England',
        user=emma
    )

    pool_fourty = Pool(
        name='Horeseshoe Falls, River Fechan',
        image='https://www.telegraph.co.uk/content/dam/Travel/2017/April/waterfall-horseshoe.jpg?imwidth=1240',
        description='Swimming there: A fantastic set of large, deep forest plunge pools beneath a horseshoe-shaped waterfall. The top pool has a tree and high cliff that you can jump from. Getting there: From the junction pool and footbridge (for Lady Falls) bear right and follow the main stream a further half mile (35 minutes).',
        type='River',
        address='Horeseshoe Falls, River Fechan, Llangollen, LL20 8BN',
        lng='-3.5936',
        lat='51.7742',
        region='Wales',
        heated=False,
        country='Wales',
        user=emma
    )

    pool_fourtyone = Pool(
        name='Highgate Men\'s Bathing Pond',
        image='https://wildswim.com/imageprocessor/1307057c-00d2-4bca-8879-cb4483133442.jpg?width=0&height=0&mode=crop',
        description='Hampstead has three different ponds for swimming: one for men, one for women and one mixed. Only swimmers over eight years of age are allowed; those between eight and 15 years old must be in the care of an adult. Winter swimming is sometimes available at the ponds, which remain popular with users. The Men\'s Pond is situated on the eastern edge of Hampstead Heath.',
        type='Pond',
        address='Hampstead Heath, Highgate, London NW3 1BP',
        lng='-0.157134',
        lat='51.563222',
        region='Greater London',
        heated=False,
        country='England',
        user=emma
    )

    pool_fourtytwo = Pool(
        name='Charlton Lido',
        image='https://charltonchampion.files.wordpress.com/2018/05/img_5302.jpg',
        description='Head out past Greenwich and Blackheath to Charlton, where you’ll find this glittering 50 metre pool on Hornfair Park, heated to a comfortable temperature. An outdoor swimming session here costs £6, and it’s open 7am – 6pm each day.',
        type='Lido',
        address='Hornfair Park, Shooters Hill Rd, London, SE18 4LX',
        lng='0.046680',
        lat='51.472771',
        region='Greater London',
        heated=False,
        country='England',
        user=george
    )

    pool_fourtythree = Pool(
        name='Hampstead Mixed Pond',
        image='https://wildswim.com/imageprocessor/1307057c-00d2-4bca-8879-cb4483133442.jpg?width=0&height=0&mode=crop',
        description='Hampstead has three different ponds for swimming: one for men, one for women and one mixed. Only swimmers over eight years of age are allowed; those between eight and 15 years old must be in the care of an adult. Winter swimming is sometimes available at the ponds, which remain popular with users.',
        type='Pond',
        address='Hampstead Heath, Highgate, London, NW3 1BP',
        lng='-0.165985',
        lat='51.559904',
        region='Greater London',
        heated=False,
        country='England',
        user=george
    )

    pool_fourtyfour = Pool(
        name='West Reservoire Centre',
        image='https://outdoorswimmer.com/assets/site/_725x475_crop_center-center/W-Reservoir-20160706_083029-small.jpg',
        description='West Reservoir Centre is located in a hidden part of the London Borough of Hackney, located on 23 acres of water in a 30 acre site. The Centre is Adventure Activities Licensing Authority (AALA) accredited and recognised by both British Canoeing (BC) and the Royal Yachting Association (RYA), providing the opportunity to take part in certificated sailing and kayaking courses for adults and children under the watchful eyes of our expert instructors. The Centre also runs a Youth Club that provides young people with the opportunity to participate in watersports, working towards National Governing Body proficiency awards as well as hosting school holiday multi-activity weeks, private and small group sessions along with Open Water Swimming in the heart of the London in the Borough of Hackney. Why not watch these activities in this tranquil corner of Hackney from our waterside café or hire a room for that important business meeting or wedding reception.',
        type='Pond',
        address='West Reservoir Water Sports Centre, Green Lanes, Hackney, London, N4 2HA',
        lng='-0.092023',
        lat='51.567364',
        region='Greater London',
        heated=False,
        country='England',
        user=george
    )

    pool_fourtyfive = Pool(
        name='Shadwell Basin',
        image='https://i2.wp.com/lovewapping.org/wp-content/uploads/2018/07/Shadwell_Basin_swimmers.png?fit=1024%2C575',
        description='Shadwell has been intimately linked with water for centuries. The clue is in the name. The basin itself, a vast body of water the size of two football pitches, is relatively young. Opened in 1832 as part of the Docklands, it was once a hub of industry. But with age it has mellowed and given itself to pleasure. Anglers, boaters and even the occasional swimmer all make use of its cool, deep waters. Although fed by the river, the basin is clear and still. Friendly carp the size of small dogs emerge from the depths to beckon you in. The chaos and conflict of the city is still well within sight — Canary Wharf looms menacingly to the east. But with a “frog’s eye view”, as the late founding father of the wild swimming movement Roger Deakin put it, things don’t seem quite so bad.',
        type='Lido',
        address='Shadwell Basin, Wapping, London, E1W 3SG',
        lng='-0.051202',
        lat='51.507482',
        region='Greater London',
        heated=False,
        country='England',
        user=george
    )

    pool_fourtysix = Pool(
        name='Bolton Priory',
        image='http://www.wildswimming.co.uk/wp-content/uploads/place/_MG_6834.JPG',
        description='A popular stretch of river in front of the priory ruins. Upstream of stepping stones and bridge is deeper section where people sometimes use boats. Downstream are the shallows but underground rocks make swimming difficult and diving dangerous.',
        type='Lido',
        address='Bolton Abbey, Skipton, BD23 6AL',
        lng='-1.890291',
        lat='53.983858',
        region='Yorkshire and The Humber',
        heated=False,
        country='England',
        user=george
    )


    comment_one = Comment(
        content='Favourite pool in London.',
        user=emma,
        pool=pool_one
    )

    comment_two = Comment(
        content='Most relaxing place to swim.',
        user=emma,
        pool=pool_six
    )

    comment_three = Comment(
        content='Worth the hike to get there!',
        user=emma,
        pool=pool_eight
    )

    comment_four = Comment(
        content='Very tranquil spot.',
        user=amy,
        pool=pool_fourty
    )

    comment_five = Comment(
        content='Best time to go is first thing in the morning!',
        user=amy,
        pool=pool_one
    )

    comment_six = Comment(
        content='Great spot in the summer.',
        user=george,
        pool=pool_two
    )

    comment_seven = Comment(
        content='Much nicer than you expect',
        user=george,
        pool=pool_fourtyfive
    )

    comment_eight = Comment(
        content='Surprisingly nice',
        user=emma,
        pool=pool_fourtyfive
    )

db.commit()
