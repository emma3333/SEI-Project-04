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
    const { id } = this.state.user
    return (
      <section className="section">
        <div className="container">

          <div className="columns is-variable is-2">
            <div className="column is-third">
              <div className="box">
                <div className="">
                  <figure className="image">
                    <img src={this.state.user.image} alt={this.state.user.username} />
                  </figure>
                </div>
                <div className="username">
                  <h3 className="subheading-show">{this.state.user.username}</h3>
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
