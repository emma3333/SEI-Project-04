import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Map from './Map'
import regions from '../../lib/regions'
import types from '../../lib/types'


class PoolsCollection extends React.Component {

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
    console.log(regions)
    console.log(types, 'types')
    if(!this.state) return <p>Loading...</p>
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="columns is-multiline">
          <Map />

        </div>
        <div className="container">


          <div className="columns is-multiline">
            {regions.map(region =>
              <div key={region} className="column is-one-quarter-desktop is-one-third-tablet">
                <Link to={`/pools?region=${region}`}>
                  <img src='/assets/homehero.jpg' alt={region} />
                </Link>
              </div>
            )}
          </div>

          <div className="columns is-multiline">
            {types.map(type =>
              <div key={type} className="column is-one-quarter-desktop is-one-third-tablet">
                <Link to={`/pools?type=${type}`}>
                  <img src='/assets/homehero.jpg' alt={type} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

    )
  }
}

export default PoolsCollection
