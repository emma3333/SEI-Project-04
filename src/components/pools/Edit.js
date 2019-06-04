import React from 'react'
import axios from 'axios'

import Form from './Form'
import Auth from '../../lib/Auth'

class Edit extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/pools/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()
    const token = Auth.getToken()
    const data = {...this.state.data}
    delete data['id']
    delete data['user']
    axios.put(`/api/pools/${this.state.data.id}`, data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/pools'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    console.log(this.state , 'STATE')
    console.log(this.state.data, 'DATA')
    return (
      <main>
        <section className="hero collection-hero">
          <h1 className="">Wild Swimming: Edit</h1>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet">
                <Form
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  data={this.state.data}
                  errors={this.state.errors}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Edit
