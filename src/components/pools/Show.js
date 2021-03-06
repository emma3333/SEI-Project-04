import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import Promise from 'bluebird'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'
import Loading from '../common/Loading'

const mapboxToken = process.env.MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapboxToken
})

class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pool: null,
      pools: [],
      data: null,
      active: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.handleDeleteComments = this.handleDeleteComments.bind(this)
    this.handleStar = this.handleStar.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  getPools() {
    Promise.props({
      pool: axios.get(`/api/pools/${this.props.match.params.id}`).then(res => res.data),
      pools: axios.get('/api/pools').then(res => res.data)
    })
      .then(res => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${res.pool.lat}, ${res.pool.lng}`)
          .then(res2 => this.setState({ pool: res.pool, pools: res.pools, weatherForecast: res2.data.daily.data }))
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  componentDidMount() {
    this.getPools()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.getPools()
    }
  }

  clickMarker(pool) {
    this.setState({
      active: true,
      pool,
      currentLocation: {lng: pool.lng, lat: pool.lat},
      zoom: [12]
    })
  }

  handleChange(e) {
    const data = { ...this.state.comment, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleComment(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.post(`/api/pools/${this.props.match.params.id}/comments`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.getPools())
  }

  handleDeleteComments(e) {
    axios.delete(`/api/pools/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getPools())
  }

  handleStar() {
    axios.post(`/api/pools/${this.props.match.params.id}/star`, null, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/profile'))
  }

  handleDelete() {
    const token = Auth.getToken()
    axios.delete(`/api/pools/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/pools'))
  }

  canModify() {
    // if the user is logged in AND the user's id matches the characters' user's id return true
    return Auth.isAuthenticated() && Auth.getPayload().sub === this.state.pool.user.id
  }

  render() {
    if(!this.state.pool) return <Loading />

    const { name, description, type, address, region, heated, country, image, comments, id } = this.state.pool
    const nearby = this.state.pools.filter(pool => pool.region === this.state.pool.region && pool.name !== this.state.pool.name)
    const weatherForecast = this.state.weatherForecast
    const forecastDays = weatherForecast.map(day => new Date(day.time * 1000))
    const celsiusLow = weatherForecast.map(temp => Math.ceil((temp.temperatureLow-32)*(5/9)))
    const celsiusHigh = weatherForecast.map(temp => Math.ceil((temp.temperatureHigh-32)*(5/9)))

    return (

      <section className="is-fullheight-with-navbar">

        <Map
          style="mapbox://styles/mapbox/streets-v10"
          zoom={[10]}
          center={[ this.state.pool.lng, this.state.pool.lat ]}
          containerStyle={{
            height: '40vh',
            width: '100vw'
          }}>
          {this.state.pools.map(pool =>
            <Marker
              key={pool.id}
              coordinates={[pool.lng, pool.lat]}
              onClick={() => this.clickMarker(pool)}
              anchor="bottom">
              <img src={'/assets/marker.png'}/>
            </Marker>
          )}
          {this.state.active &&
          <Popup
            coordinates= {[ this.state.pool.lng, this.state.pool.lat ]}
            anchor="bottom-left"
            offset={[-2, -40]}
          >
            <div>
              <Link to={`/pools/${this.state.pool.id}`}>
                <p className="popup">{this.state.pool.name}</p>
                <hr className="popup-hr"/>
                <p className="popup">{this.state.pool.address}</p>
              </Link>
            </div>
          </Popup> }
        </Map>

        {/* POOL INFO =====================================================*/}
        <div className="section">
          <div className="container">
            <div className="columns is-multiline">

              <div className="column is-half-desktop is-half-tablet is-full-mobile">
                <figure className="image">
                  <img src={image} alt={name} />
                </figure>


                <div className="buttons star-edit-delete">

                  {this.canModify() &&
                    <div className="level-right">
                      <Link to={`/pools/${id}/edit`} className="button is-light is-small">Edit</Link>
                      <button className="button is-dark is-small" onClick={this.handleDelete}>Delete</button>
                    </div>
                  }
                  {Auth.isAuthenticated() &&
                    <button onClick={this.handleStar} className="button is-light is-small">Star this pool</button>
                  }
                </div>


                {/* WEATHER FORECAST - DARSKY API MAP ===========================================*/}
                <h4 className="title is-6 pool-heading">8 Day Weather Forecast</h4>
                <hr className="show-hr-comment" />
                <table className="table is-narrow is-bordered">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Summary</th>
                      <th>Low(°C)</th>
                      <th>High(°C)</th>
                    </tr>
                    {weatherForecast.map((day, i) => {
                      const date = forecastDays[i]
                      const tempLow = celsiusLow[i]
                      const tempHigh = celsiusHigh[i]
                      return <tr key={day.time}>
                        <td>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</td>
                        <td>{day.summary}</td>
                        <td>{tempLow}</td>
                        <td>{tempHigh}</td>
                      </tr>
                    }
                    )}

                  </thead>
                </table>

              </div>

              <div className="column is-half-desktop is-half-tablet is-full-mobile">
                <h2 className="title is-4 pool-heading">{name}</h2>
                <hr className="show-hr"/>
                <p className="pool-show-info">Description: {description}</p>
                <p className="pool-show-info">Type: {type}</p>
                <p className="pool-show-info">Heated: {heated}</p>
                <p className="pool-show-info">Address: {address}</p>
                <p className="pool-show-info">Region: {region}</p>
                <p className="pool-show-info">Country: {country}</p>

                {/* COMMENTS =====================================================*/}

                <div className="">
                  <h2 className="title is-6 comment-heading">Comments</h2>
                  <hr className="show-hr-comment"/>
                  <article className="media">
                    <figure className="media-left">
                      <p className="image is-64x64">
                        <img src="https://candobristol.co.uk/img/profile-pic.svg" />
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="field">
                        <p className="control">
                          <textarea className="textarea" name="content" placeholder="Add a comment..." onChange= {this.handleChange}></textarea>
                        </p>
                      </div>
                      <nav className="level">
                        <div className="level-left">

                          <div className="level-item">
                            <a className="button is-dark is-small" onClick={this.handleComment}>Submit</a>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </article>

                  {comments.map(comment =>
                    <article key={comment.id} className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <img src={comment.user.image} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p className="commentText">
                            <strong>{comment.user.username}</strong>  <small>{comment.created_at.substring(0, comment.created_at.length - 8)}</small>
                            <br />
                            {comment.content}
                          </p>
                        </div>
                        <nav className="level is-mobile">
                          <div className="level-left">
                            <a className="level-item">
                              <span className="icon is-small"><i className="fas fa-reply"></i></span>
                            </a>
                            <a className="level-item">
                              <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                            </a>
                            <a className="level-item">
                              <span className="icon is-small"><i className="fas fa-heart"></i></span>
                            </a>
                          </div>
                        </nav>

                      </div>
                      <div className="media-right">
                        <button id={comment.id} value={comment.user.id} className="delete" onClick={this.handleDeleteComments}></button>
                      </div>
                    </article>
                  )}
                </div>


              </div>
            </div>
          </div>


          {/* POOLS NEARBY ================================================*/}

          <section className="section">
            <div className="columns is-multiline">

            </div>
            <div className="container">
              <h2 className="title is-6 pool-heading">Nearby pools</h2>
              <hr className="show-hr"/>

              <div className="columns is-multiline">

                {nearby.map(pool =>
                  <div key={pool.id} className="column is-one-fifth-desktop is-one-third-tablet">
                    <Link to={`/pools/${pool.id}`}>
                      <figure className="image is-16by9">
                        <img src={pool.image} alt={pool.name}/>
                      </figure>
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </section>
        </div>
      </section>
    )

  }

}

export default Show
