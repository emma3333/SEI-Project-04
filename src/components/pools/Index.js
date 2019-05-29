import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZW1tYTIwMTkiLCJhIjoiY2p3OTZqYWhtMGdkejQxcGRpZnozc2cwcCJ9.y7XLy3U5leX_xHO1Qer06w'
})


class Index extends React.Component {

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

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getData()
    }
  }

  render() {
    console.log(this.state.pools)
    if(!this.state) return <p>Loading...</p>
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="columns is-multiline">
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '40vh',
              width: '100vw'
            }}>
            {this.state.pools.map(pool =>
              <Marker key={pool.id}
                coordinates={[pool.long, pool.lat]}
                anchor="bottom">
                <img src={'../../assets/marker.png'}/>
              </Marker>
            )}
          </Map>
        </div>



        <div className="columns is-multiline">
          {this.state.pools.map(pool =>
            <div key={pool.id} className="column is-one-quarter-desktop is-one-third-tablet">
              <Link to={`/pools/${pool.id}`}>
                <Card {...pool} />
              </Link>
            </div>
          )}
        </div>



      </section>

    )
  }
}

export default Index
