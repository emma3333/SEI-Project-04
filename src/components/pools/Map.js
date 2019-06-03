import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import { Link } from 'react-router-dom'
import Loading from '../common/Loading'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})

class PoolsMap extends React.Component {
  constructor() {
    super()

    this.state={
      currentLocation: {
        lat: false,
        lng: false
      },
      pools: [],
      marker: null,
      zoom: [10],
      active: false,
      poolId: ''
    }
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({ currentLocation: {lng: latitude, lat: longitude }})
    })

    axios.get('/api/pools')
      .then(res => this.setState({ pools: res.data }))
  }

  clickMarker(pool) {
    this.setState({ active: true })
    this.setState({ pool })
    this.setState({ currentLocation: {lat: pool.lng, lng: pool.lat }})
    this.setState({ zoom: [12] })
    this.setState({ poolId: pool.id })
  }

  render() {
    {if(this.state.currentLocation.lat === false)
      return(
        <div className='section'>
          <p>Loading..</p>
        </div>
      )}
    return (
      <section className="hero map-hero">
        <div className="columns is-multiline">
          <Map
            style="mapbox://styles/mapbox/streets-v10"
            center={[ this.state.currentLocation.lat, this.state.currentLocation.lng ]}
            zoom = {this.state.zoom}
            containerStyle={{
              height: '50vh',
              width: '100vw'
            }}>
            {this.state.pools.map(pool =>
              <Marker
                key={pool.id}
                coordinates={[pool.lng, pool.lat]}
                onClick={() => this.clickMarker(pool)}
                anchor="bottom">
                <img src={'../../assets/marker.png'}/>
              </Marker>
            )}
            {this.state.active &&
            <Popup
              coordinates= {[ this.state.pool.lng, this.state.pool.lat ]}
              anchor="bottom-left"
              offset={[-2, -40]}
            >
              <div>
                <Link to={`/pools/${this.state.poolId}`}>
                  <p>{this.state.pool.name}</p>
                  <p>{this.state.pool.address}</p>
                </Link>
              </div>
            </Popup> }
          </Map>
        </div>
      </section>
    )
  }
}

export default PoolsMap
