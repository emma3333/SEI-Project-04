import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

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
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        console.log('AFTER LOAD', res.data)
        this.setState({ user: res.data })
      })
      .catch(err => console.error(err))
  }


  render() {
    console.log(this.state.user)
    if(!this.state.user) return null
    const starredPools = this.state.user.starred_pools

    return (
      <main>
        <section className="hero collection-hero">
          <h1 className="">Wild Swimming: {this.state.user.username}</h1>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-third">

                <div className="card user">
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
                <h3 className="columns title is-4">Starred places</h3>
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
      </main>
    )
  }
}

export default UserShow
