import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
const token = Auth.getToken()

class UserShow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      user: {
        pools: [],
        starred_pools: []
      }
    }
  }

  componentDidMount() {
    axios.get('/api/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ user: res.data }))
      .then(() => {
        if(this.props.location.state) {
          return this.handleStar()
        }
      })
      .catch(err => console.error(err))
  }


  render() {
    if(!this.state.user) return null
    console.log(this.state.user, 'USER')
    console.log(this.props.location, 'LOCATION.STATE.POOL')
    console.log(this.state.user.starred_pools)

    const starredPools = this.state.user.starred_pools
    console.log(starredPools, 'STARREDPOOLS')

    return (
      <section className="section">
        <div className="container">

          <div className="columns">

            <div className="column is-one-third">

              <div className="card">
                <div className="card-image">
                  <figure className="image is-square">
                    <img src={this.state.user.image} alt={this.state.user.username} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-right">
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{this.state.user.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-two-thirds">
              <h3 className="columns subtitle is-4">Starred places</h3>
              <hr className="show-hr"/>

              <div className="columns is-multiline">
                {starredPools.length === 0 ? <p>No starred pools yet</p> :
                  starredPools.map(pool =>
                    <div key={pool.id} className="column is-one-quarter-desktop">
                      <Link to={`/pools/${pool.id}`}>
                        <img src={pool.image} alt={pool.name} />
                      </Link>
                    </div>
                  )}
              </div>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserShow
