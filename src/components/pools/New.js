import React from 'react'
import axios from 'axios'

import Form from './Form'
import Auth from '../../lib/Auth'

class New extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      pools: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()

    axios.post('/api/pools', this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/pools'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {

    return (
      <main>
        <section className="hero collection-hero">
          <h1 className="">Wild Swimming: Add Pool</h1>
        </section>

        <div className="container">
          <div className="columns is-centered add-new">
            <div className="column is-half-desktop is-two-thirds-tablet form">
              <Form
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                data={this.state.data}
                errors={this.state.errors}
              />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default New
