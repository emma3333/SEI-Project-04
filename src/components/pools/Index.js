import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Card'
import qs from 'query-string'
import Map from './Map'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.props.match.query = qs.parse(this.props.location.search)
    this.handleChange = this.handleChange.bind(this)
    this.state={
      pools: [],
      list: '',
      searchText: '',
      region: this.props.match.query.region || ''
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  getData(){
    console.log('QUERY =====>', this.props.match.query)
    axios.get('/api/pools', {
      params: this.props.match.query
    })
      .then(res => this.setState({ pools: res.data }))
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    if(
      prevProps.location.pathname !== this.props.location.pathname ||
      prevProps.location.search !== this.props.location.search
    ) {
      this.props.match.query = qs.parse(this.props.location.search)
      this.getData()
    }
  }

  searchPool() {
    const search = new RegExp(this.state.searchText, 'i')
    // const region = new RegExp(this.state.region, 'i')
    return this.state.pools.filter(pool => {
      return (search.test(pool.name) || search.test(pool.address || search.test(pool.region) || search.test(pool.description))) || search.test(pool.region)
    })
  }

  render() {
    if(!this.state.pools) return null
    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="columns is-multiline">

          {/* MAP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}
          <Map pools={this.state.pools} />

        </div>

        <div className="section index-search">
          <div className="container columns is-right">

            {/* SEARCH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/}

            <div className="control column index-control">

              <input
                className="input search-index"
                type="text"
                placeholder="Search..."
                name="searchText"
                onChange={this.handleChange}
              />
            </div>

          </div>

          <div className="columns is-multiline">
            {this.searchPool().map(pool =>
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

export default Index
