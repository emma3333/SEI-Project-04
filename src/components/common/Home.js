import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZW1tYTIwMTkiLCJhIjoiY2p3OTZqYWhtMGdkejQxcGRpZnozc2cwcCJ9.y7XLy3U5leX_xHO1Qer06w'
})

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="columns is-multiline">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '50vh',
            width: '100vw'
          }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </Map>
      </div>
      <div className="hero-body">
        <div className="container">
          <h1 className="title display">Wild Swimming</h1>
          <h2 className="subtitle"></h2>
        </div>
      </div>
    </section>
  )
}

export default Home
