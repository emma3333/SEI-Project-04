import React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import axios from 'axios'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      pools: []
    }
  }

  componentDidMount() {
    axios.get('/api/pools')
      .then(res => this.setState({ pools: res.data }))
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
              <Marker key={pool.id}
                coordinates={[pool.lng, pool.lat]}
                anchor="bottom">
                <img src={'../../assets/marker.png'}/>
              </Marker>
            )}
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
