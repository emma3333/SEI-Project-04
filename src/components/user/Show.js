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
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => {
        if(this.props.location.state) {
          return this.handleStar()
        }
      })
      .catch(err => console.error(err))
  }

  handleStar() {
    const token = Auth.getToken()
    const currentUser = this.state.user.id
    const starred_pools = this.state.user.starred_pools.slice()
    starred_pools.push(this.props.location.state.pool)
    const user = {...this.state.user, starred_pools}
    axios.put(`/api/users/${currentUser}`, {starred_pools: starred_pools}, {headers: { 'Authorization': `Bearer ${token}` }})
      .then(() => this.setState({ user }))
      .catch(err => console.error(err))
  }


  render() {
    if(!this.state.user) return null
    console.log(this.state.user)
    const { id } = this.state.user
    return (
      <section className="section">
        <div className="container">

          <div className="columns">

            <div className="column is-third">

              <div className="card">
                <div className="card-image">
                  <figure className="image is-1by1">
                    <img src={this.state.user.image} alt={this.state.user.username} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{this.state.user.username}</p>
                      <p className="subtitle is-6">@{this.state.user.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-two-thirds">
              <h3 className="subtitle subheading-show">Starred places</h3>

              <div className="columns is-multiline">
                {this.state.user.starred_pools.map(pool =>
                  <div key={pool.id} className="column is-one-quarter">
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
