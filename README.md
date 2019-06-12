# SEI-Project-04: Full Stack React App

### Timeframe

7 day solo project

## Technologies used

* JavaScript (ES6)
* Python
* React
* PostgreSQL
* Flask
* HTML5, SCSS, Bulma
* Git
* GitHub

## Installation

1. Clone or download the repo
2. Install yarn (and pipenv) in the Terminal
3. Run 'yarn run:server' in the Terminal to launch the server
4. Run 'yarn run:client' in the Terminal to launch the frontend

## Overview

Inspired by my love of swimming outdoors, I decided to base my final project on wild swimming places across the UK.

[Link to application](https://wild-swimming.herokuapp.com/#/)

### The Brief

The brief was to create a full-stack application by making my own backend using a Python Flask API with a Postgres database, and a front-end built with React that utilises Webpack. The application had to enable a user to register, login and add content. I also used React Mapbox GL and Dark Sky APIs in addition to my own to enhance the application.

![Home page](https://user-images.githubusercontent.com/35655626/59350695-a21a3680-8d14-11e9-9a5f-741846038d55.png)

___________

![Pool show page](https://user-images.githubusercontent.com/35655626/59350581-5cf60480-8d14-11e9-8096-2427a5ca4e7b.png)

### The Process
Before I started coding I made a Trello board to plan the project, writing down what the Postgres relationships were, what models and controllers were required for the backend, what components I needed in the front-end, and how I would manage the workload over the week. I then created wireframes for the front-end, before beginning to code the bulk of the backend and then starting on the front-end.

#### Backend
When approaching the backend, the first thing I did was decide on the models needed and relationships between them and sketch out entity relationship diagrams (ERDs) to clarify the following relationships:

1. One-to-many relationship between users and pools
2. One-to-many relationship between users and comments
3. One-to-many relationship between pools and comments

I then described the table properties and schemas in the models, before creating routes and functions in my controllers. I tested each route in my pool and auth controllers as I went along.

#### Front-end

I used React to write the front-end and started with the key components that completed the user journey, testing them as I went along. For the maps on my application, I used React-mapbox-gl, which is used on my home page, pool show page and browse page. The map's central point on the index page is set to the user's current location, whereas on the pool show page, the map's central point is based on the latitude and longitude of the current pool you're on.

For the pool show page, in addition to displaying information about the specific pool selected, I wanted to have a section displaying the weather forecast for that pool for the next week, and a section displaying nearby pools (based on region). In order to do this, I needed to use a Bluebird Promise to control when the axios request would run to manage the asynchronous behaviour of JavaScript. I used axios to get the data for the pool and pools from my API, and then used another axios get request to retrieve the weather forecast for the pool using the Dark Sky API (see below).

Pool show component:
```javascript
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
```

I then used a filter function on the pools and stored this in a variable which I mapped over to display on the page.

```
const nearby = this.state.pools.filter(pool => pool.region === this.state.pool.region && pool.name !== this.state.pool.name)
```

Once I had the data from the Dark Sky API, I had to convert the date formatted as a UNIX string into one that was readable, and convert the temperature supplied in Fahrenheit to Celsius and then map over the data and format the data in a table which I did as follows.

```
const weatherForecast = this.state.weatherForecast
const forecastDays = weatherForecast.map(day => new Date(day.time * 1000))
const celsiusLow = weatherForecast.map(temp => Math.ceil((temp.temperatureLow-32)*(5/9)))
const celsiusHigh = weatherForecast.map(temp => Math.ceil((temp.temperatureHigh-32)*(5/9)))
```

```
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
```

#### Challenges

* One of the biggest challenges was creating the 'starred pool' feature, where a user can star a pool which will add that pool to their profile. While writing the code for this, I ran into a recursion problem as I hadn't excluded the necessary fields in my schemas. I then had to state the reverse property of the 'starred_by' and 'starred_pools' properties in my models (see below) as Python didn't recognise the reverse relationship. To create the route for the starred pool, I wrote a function in my pool controller which I then posted to from my pool show component in the frontend, before mapping over the array in the user show component to display on the profile page in the browser.

Pool model:
```python
starred_by = Set('User', reverse='starred_pools')
```

User model:
```python
starred_pools = Set('Pool', reverse='starred_by')
```

Pool controller:
```python
@router.route('/pools/<int:pool_id>/star', methods=['POST'])
@db_session
@secure_route
def star_pool(pool_id):
    schema = PoolSchema()
    pool = Pool.get(id=pool_id)
    pool.starred_by.add(g.current_user)
    db.commit()

    return schema.dumps(pool)
```

Pool show component:
```javascript
handleStar() {
  axios.post(`/api/pools/${this.props.match.params.id}/star`, null, {
    headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
  })
    .then(() => this.props.history.push('/profile'))
}
```

## Future enhancements

If I were to develop the project, I would like to turn the app into a journey planner for a wild swimming day out, pulling in more APIs like Citymapper (for travel information) and Yelp (for nearby pubs and restaurants) to build a full itinerary for a day of wild swimming! I would also use Mapbox, rather than React-mapbox-gl.
