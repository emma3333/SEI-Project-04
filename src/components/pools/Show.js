import React from 'react'
import axios from 'axios'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import Promise from 'bluebird'
import Card from './Card'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

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
      data: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.handleDeleteComments = this.handleDeleteComments.bind(this)

  }

  getPools() {
    Promise.props({
      pool: axios.get(`/api/pools/${this.props.match.params.id}`).then(res => res.data),
      pools: axios.get('/api/pools').then(res => res.data)
    })
      .then(data => this.setState(data))
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
    const token = Auth.getToken()
    axios.delete(`/api/pools/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    } )
      .then(() => this.getPools())
  }



  render() {
    if(!this.state.pool) return null

    const { name, description, type, address, lng, lat, region, heated, country, user, image, comments } = this.state.pool

    const nearby = this.state.pools.filter(pool => pool.region === this.state.pool.region && pool.name !== this.state.pool.name)

    console.log(comments, 'COMMENTS')

    console.log(this.state.data, 'COMMENT DATA')

    return (

      <section className="is-fullheight-with-navbar">

        <Map
          style="mapbox://styles/mapbox/streets-v10"
          zoom={[10]}
          center={{
            lat: 51.527714,
            lng: -0.095843
          }}
          containerStyle={{
            height: '40vh',
            width: '100vw'
          }}>
          <Marker
            coordinates={[lng, lat]}
            anchor="bottom">
            <img src={'../../assets/marker.png'}/>
          </Marker>
        </Map>

        {/* POOL INFO ===================================================*/}
        <div className="section">
          <div className="columns is-multiline">

            <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
              <figure className="image">
                <img src={image} alt={name} />
              </figure>


              {/* COMMENTS ==================================================*/}
              <div className="">
                <h2 className="subtitle is-6 comment-heading">Comments</h2>
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
                        <Link to={`/users/${comment.user.id}`}>
                          <img src={comment.user.image} />
                        </Link>
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

            <div className="column is-two-fifths-desktop is-half-tablet is-full-mobile">
              <h2 className="subtitle is-6 pool-heading">{name}</h2>
              <p>Description: {description}</p>
              <p>Type: {type}</p>
              <p>Heated: {heated}</p>
              <p>Address: {address}</p>
              <p>Region: {region}</p>
              <p>Country: {country}</p>
            </div>

            {/* POOLS NEARBY ================================================*/}

            <div className="column is-one-fifth-desktop is-half-tablet is-full-mobile">
              <div className="nearby-pools">
                <h2 className="subtitle is-6">Nearby pools</h2>
                <div>
                  {nearby.map(pool =>
                    <div className="nearby-pools" key={pool.id}>
                      <Link to={`/pools/${pool.id}`}>
                        <Card {...pool} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>
    )

  }

}

export default Show
