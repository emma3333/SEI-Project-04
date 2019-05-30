import React from 'react'
import axios from 'axios'

class UsersShow extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      user: []
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
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
              <div className="wishList">
                <div className="wishList">
                  <h3 className="subtitle subheading-show">Starred places</h3>
                  <div className="columns is-multiline">

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UsersShow
