import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Map from './Map'

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
    if(!this.state) return <p>Loading...</p>
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="columns is-multiline">
          <Map />

        </div>
        <div className="container">



          <div className="columns is-multiline">
            {this.state.pools.map(pool =>
              <div key={pool.id} className="column is-one-quarter-desktop is-one-third-tablet">
                <Link to={`/pools/${pool.id}`}>
                  <Card {...pool} />
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
