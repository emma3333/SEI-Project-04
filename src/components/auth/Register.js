import React from 'react'
import axios from 'axios'

class Register extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
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
    e.preventDefault() // a forms default is to reload the  browser
    axios.post('/api/register', this.state.data)
    //   method: 'POST', // POST request
    //   body: JSON.stringify(this.state.data), // send the data as the body of the request
    //   headers: { 'Content-Type': 'application/json' } // set the content type to JSON
    // })
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state)
    return (
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
                  {this.state.errors.username && <div className="help is-danger">{this.state.errors.username}</div>}

                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      name="email"
                      placeholder="eg: emma@gmail.com"
                      onChange={this.handleChange}/>
                  </div>
                  {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}

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
                  {this.state.errors.password && <div className="help is-danger">{this.state.errors.password}</div>}

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
                  {this.state.errors.password_confirmation && <div className="help is-danger">{this.state.errors.password_confirmation}</div>}

                </div>

                <button className="button is-dark is-small">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Register
