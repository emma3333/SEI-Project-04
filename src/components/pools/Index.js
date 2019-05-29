import React from 'react'
import axios from 'axios'

class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      pools: []
    }
  }

  componentDidMount() {
    axios.get('/api/pools')
      .then(res => this.setState({ pools: res.data }))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getData()
    }
  }

  render() {
    if(!this.state) return <p>Loading...</p>
    return (
      <div>
        {this.state.pools.map(pool => <div key={pool.id}>
          <h2>{pool.name}</h2>
          <p>{pool.address}</p>
          <p>{pool.description}</p>
        </div>)}
      </div>
    )
  }
}

export default Index
