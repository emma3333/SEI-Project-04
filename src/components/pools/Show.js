import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZW1tYTIwMTkiLCJhIjoiY2p3OTZqYWhtMGdkejQxcGRpZnozc2cwcCJ9.y7XLy3U5leX_xHO1Qer06w'
})

class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pool: []
    }
  }

  componentDidMount() {
    axios.get(`/api/pools/${this.props.match.params.id}`)
      .then(res => this.setState({ pool: res.data }))
  }

  render() {
    if(!this.state.pool) return null

    const { name, description, type, address, long, lat, region, heated, country, user, image} = this.state.pool

    console.log(this.state.pool)
    console.log(lat)

    return (

      <section className="hero is-fullheight-with-navbar">


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

        <div className="columns is-multiline">
          <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
            <figure className="image">
              <img src={image} alt={name} />
            </figure>
          </div>
        </div>

      </section>
    )

  }

}

export default Show
