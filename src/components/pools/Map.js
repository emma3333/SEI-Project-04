import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const mapboxToken = process.env.MAPBOX_TOKEN
// import { Link } from 'react-router-dom'

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})

class PoolsMap extends React.Component {
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
    console.log(this.state.pools)
    if(!this.state) return <p>Loading...</p>
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
              height: '100vh',
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
      </section>
    )
  }
}

export default PoolsMap
