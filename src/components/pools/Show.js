import React from 'react'
import axios from 'axios'

class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pools: null
    }
  }

  componentDidMount() {
    axios.get(`/api/pools/${this.props.match.params.id}`)
      .then(res => this.setState({ pool: res.data }))
  }

  render() {
    if(!this.state.pool) return null

    const { name, description, type, address, long, lat, region, heated, country, user, image} = this.state.pool

    return (
      <section className="section" id="vinyl-show">

        <div className="columns is-multiline">
          <h1>MAP</h1>
        </div>

        <div className="columns">
          <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
            <figure className="image">
              <img src={image} alt={name} />
            </figure>
          </div>
        </div>
      </section>
    )

  }

}

export default Show
