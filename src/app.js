import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {

  componentDidMount() {
    axios.get('/api/pools')
      .then(res => this.setState({ pools: res.data }))
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
