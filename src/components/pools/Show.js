import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Promise from 'bluebird'
import Card from './Card'
import { Link } from 'react-router-dom'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN
})

class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pool: [],
      pools: []
    }
  }

  getPools() {
    Promise.props({
      pool: axios.get(`/api/pools/${this.props.match.params.id}`).then(res => res.data),
      pools: axios.get('/api/pools').then(res => res.data)
    })
      .then(res => {
        this.setState({ pool: res.pool, pools: res.pools })
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    this.getPools()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getPools()
    }
  }

  render() {
    if(!this.state.pool) return null

    const { name, description, type, address, long, lat, region, heated, country, user, image} = this.state.pool

    const nearby = this.state.pools.filter(pool => pool.region === this.state.pool.region && pool.name !== this.state.pool.name)

    console.log(this.state.pool, 'POOL')
    console.log(this.state.pools, 'POOLS')
    console.log(nearby, 'SIMILAR')

    return (

      <section className="is-fullheight-with-navbar">

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '40vh',
            width: '100vw'
          }}>
          <Marker
            coordinates={[long, lat]}
            anchor="bottom">
            <img src={'../../assets/marker.png'}/>
          </Marker>
        </Map>

        <div className="section">
          <div className="columns is-multiline">

            <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
              <figure className="image">
                <img src={image} alt={name} />
              </figure>
            </div>
            <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
              <h2 className="subtitle is-6 pool-heading">{name}</h2>              <p>Description: {description}</p>
              <p>Type: {type}</p>
              <p>Heated: {heated}</p>
              <p>Address: {address}</p>
              <p>Region: {region}</p>
              <p>Country: {country}</p>
            </div>

            <div className="column is-one-fifth-desktop is-half-tablet is-full-mobile">
              <div className="nearby-pools">

                <h2 className="subtitle is-6 subheading-show">Nearby pools</h2>

                <div>
                  {nearby.map(pool =>
                    <div className="pool-heading" key={pool.id}>
                      <Link to={`/pools/${pool.id}`}>
                        <Card {...pool} />
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>


      </section>
    )

  }

}

export default Show
