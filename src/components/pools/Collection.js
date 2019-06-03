import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Map from './Map'
import Loading from '../common/Loading'
import regions from '../../lib/regions'

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
    if(!this.state) return <Loading />
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


        </div>
      </section>

    )
  }
}

export default PoolsCollection
