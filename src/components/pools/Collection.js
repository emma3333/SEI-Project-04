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
    console.log(this.state.pools, 'POOLS')
    console.log(regions)
    if(!this.state) return <Loading />
    return (
      <main>
        <section className="hero">
          <div className="columns is-multiline">
            <Map />
          </div>
        </section>
        <section className="section featured">
          <div className="container">
            <div className="columns is-multiline is-vcentered">
              <Link to="region/Wales" className="column is-half-desktop is-full-mobile is-half-tablet is-vcentered" id="art-one"><div>BY THE SEA</div> </Link>
              <Link to="/pools/scotland" className="column is-half-desktop is-full-mobile is-half-tablet" id="art-two"><div>LONDON</div> </Link>
              <Link to="/pools" className="column is-half-desktop is-full-mobile is-half-tablet" id="art-three"><div>HEATED</div> </Link>
              <Link to="/pools" className="column is-half-desktop is-full-mobile is-half-tablet" id="art-four"><div>LIDOS</div> </Link>
              <Link to="/pools" className="column is-half-desktop is-full-mobile is-half-tablet" id="art-three"><div>NEAR WATERFALLS</div> </Link>
              <Link to="/pools" className="column is-half-desktop is-full-mobile is-half-tablet" id="art-four"><div>RIVERS</div> </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default PoolsCollection


// {regions.map(region =>
//   <div key={region} className="column is-one-quarter-desktop is-one-third-tablet">
//     <Link to={`/pools?region=${region}`}>
//       <img src='/assets/homehero.jpg' alt={region} />
//     </Link>
//   </div>
// )}
