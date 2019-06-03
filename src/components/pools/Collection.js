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
            <div className="columns collection is-multiline is-centered">
              <Link to="/pools?type=coastal" className="column is-one-quarter is-full-mobile is-half-tablet pool-collection1 notification is-dark">
                <h3 className="subtitle is-4">COASTAL</h3>
                <hr />
              </Link>
              <Link to="/pools?region=Greater London" className="column is-one-quarter is-full-mobile is-half-tablet pool-collection1 notification is-dark">
                <h3 className="subtitle is-4">LONDON</h3>
                <hr />
              </Link>
              <Link to="/pools?type=river" className="column is-one-quarter is-full-mobile is-half-tablet pool-collection1 notification is-dark">
                <h3 className="subtitle is-4">RIVERS</h3>
                <hr />
              </Link>
              <Link to="/pools?type=lido" className="column is-one-quarter is-full-mobile is-half-tablet pool-collection1 notification is-dark">
                <h3 className="subtitle is-4">LIDOS</h3>
                <hr />
              </Link>
              <Link to="/pools?region=Scotland" className="column is-one-quarter is-full-mobile is-half-tablet pool-collection1 notification is-dark">
                <h3 className="subtitle is-4">SCOTLAND</h3>
                <hr />
              </Link>
              <Link to="/pools?type=lake" className="column is-one-quarter is-full-mobile is-half-tablet pool-collection1 notification is-dark">
                <h3 className="subtitle is-4">LAKES</h3>
                <hr />
              </Link>
            </div>
          </div>
        </section>


      </main>
    )
  }
}

export default PoolsCollection
