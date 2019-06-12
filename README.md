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

I used React to write the front-end and started with the key components that completed the user journey, testing them as I went along.

#### Challenges

* One of the biggest challenges was creating the 'starred pool' feature, where a user can star a pool which will add that pool to their profile. I ran into a recursion problem in the backend as I hadn't excluded the necessary fields in my schemas. I then had to state the reverse property of the 'starred_by' and 'starred_pools' properties (see below) as Python didn't recognise the relationship.

Pool model:
starred_by = Set('User', reverse='starred_pools')

User model:
starred_pools = Set('Pool', reverse='starred_by')


## Future enhancements

If I were to develop the project, I would like to turn the app into a journey planner for a wild swimming day out, pulling in more APIs like Citymapper (for travel information) and Yelp (for nearby pubs and restaurants) to build a full itinerary for a day of wild swimming! I would also use Mapbox, rather than React Mapbox GL.
