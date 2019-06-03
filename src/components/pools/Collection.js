import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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

  getData() {
    axios.get('/api/pools')
      .then(res => this.setState({ pools: res.data }))
  }

  componentDidMount() {
    this.getData()
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
      <main>
        <section className="hero">
          <div className="columns is-multiline">
            <Map />

          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-multiline is-vcentered">

              <Link to="/pools?region=Wales" className="column is-half-desktop is-full-mobile is-half-tablet is-vcentered" id="collection-one">
                <div>WALES</div>
              </Link>

              <Link to="/pools?type=lido" className="column is-half-desktop is-full-mobile is-half-tablet" id="collection-two">
                <div>LIDO</div>
              </Link>

              <Link to="/pools?type=coastal" className="column is-half-desktop is-full-mobile is-half-tablet" id="collection-two">
                <div>BY THE SEA</div>
              </Link>

              <Link to="/pools?type=rivers" className="column is-half-desktop is-full-mobile is-half-tablet" id="collection-two">
                <div>RIVERS</div>
              </Link>

              <Link to="/pools?type=lakes" className="column is-half-desktop is-full-mobile is-half-tablet" id="collection-two">
                <div>LAKES</div>
              </Link>

              <Link to="/pools?region=Greater London" className="column is-half-desktop is-full-mobile is-half-tablet" id="collection-two">
                <div>LONDON</div>
              </Link>

            </div>

          </div>
        </section>
      </main>
    )
  }
}

export default PoolsCollection
