import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import { Link } from 'react-router-dom'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})

class PoolsMap extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      currentLocation: {
        lat: false,
        lng: false
      },
      marker: null,
      zoom: [11],
      active: false
    }

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({ currentLocation: {lng: latitude, lat: longitude }})
    })
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
    console.log(this.props.pools)
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
            }}
          >
            {this.props.pools && this.props.pools.map(pool =>
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
      </section>
    )
  }
}

export default PoolsMap
