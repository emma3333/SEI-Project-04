import React from 'react'
import axios from 'axios'

class Register extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      error: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    // merge data on state with new data from form
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    // set the data on state
    this.setState({ data }) // same as ({ data: data }) (ES6 shorthand)
  }

  // send data to API
  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ error: err.response.data.error }))
  }

  render() {
    console.log(this.state)
    return (
      <main>
        <section className="hero collection-hero">
          <h1 className="">Wild Swimming: Register</h1>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        name="username"
                        placeholder="eg: Emma"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.error.username && <div className="help is-danger">{this.state.error.username}</div>}

                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        placeholder="eg: emp2019@gmail.com"
                        onChange={this.handleChange}/>
                    </div>
                    {this.state.error.email && <div className="help is-danger">{this.state.error.email}</div>}

                  </div>

                  <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                      <input
                        className="input"
                        name="image"
                        placeholder="eg: https://candobristol.co.uk/img/profile-pic.svg"
                        onChange={this.handleChange}/>
                    </div>
                    {this.state.error.image && <div className="help is-danger">{this.state.error.image}</div>}

                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.error.password && <div className="help is-danger">{this.state.error.password}</div>}

                  </div>
                  <div className="field">
                    <label className="label">Password Confirmation</label>
                    <div className="control">
                      <input
                        className="input"
                        name="password_confirmation"
                        type="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.error.password_confirmation && <div className="help is-danger">{this.state.error.password_confirmation}</div>}

                  </div>

                  <button className="button submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Register
