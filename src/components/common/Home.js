import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import { Link } from 'react-router-dom'

import axios from 'axios'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      pools: [],
      active: false
    }
  }

  componentDidMount() {
    axios.get('/api/pools')
      .then(res => this.setState({ pools: res.data }))
  }


  clickMarker(pool) {
    this.setState({
      active: true,
      pool,
      currentLocation: {lat: pool.lng, lng: pool.lat},
      zoom: [12]
    })
  }

  render() {
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="columns is-multiline">
          <Map
            style="mapbox://styles/mapbox/streets-v10"
            zoom={[5]}
            center={{
              lat: 54.364384,
              lng: -1.846999
            }}
            containerStyle={{
              height: '70vh',
              width: '100vw'
            }}>
            {this.state.pools.map(pool =>
              <Marker
                key={pool.id}
                coordinates={[pool.lng, pool.lat]}
                onClick={() => this.clickMarker(pool)}
                anchor="bottom">
                <img src={'/assets/marker.png'}/>
              </Marker>
            )}
            {this.state.active &&
            <Popup
              coordinates= {[ this.state.pool.lng, this.state.pool.lat ]}
              anchor="bottom-left"
              offset={[-2, -40]}
            >
              <div>
                <Link to={`/pools/${this.state.pool.id}`}>
                  <p className="popup">{this.state.pool.name}</p>
                  <hr className="popup-hr"/>
                  <p className="popup">{this.state.pool.address}</p>
                </Link>
              </div>
            </Popup> }
          </Map>
        </div>
        <div className="hero-body">
          <div className="container home">
            <h1 className="title display">Wild Swimming</h1>
            <h2 className="subtitle"></h2>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
