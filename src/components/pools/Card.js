import React from 'react'

const Card = ({ image, name }) => {
  return (
    <div className="tile is-parent">
      <div className="tile is-parent is-vertical notification is-light">
        <article className="tile is-child">
          <h1 className="title is-5"><i className="fas fa-swimmer"></i></h1>
          <p className="subtitle">{name}</p>
          <hr className="show-hr-comment"/>
          <p></p>
        </article>
        <article className="tile is-child">
          <figure className="image is-16by9">
            <img src={image} alt={name}/>
          </figure>
        </article>
      </div>
    </div>
  )
}



export default Card


// <header classNameName="card-header">
//   <p className="card-header-subtitle">
//     {name}
//   </p>
// </header>

// <div className="card">
//   <header className="card-header">
//     <p className="card-header-title">
//       {name}
//     </p>
//   </header>
//   <div className="card-image">
//     <figure className="image is-4by3">
//       <img src={image} alt={name} />
//     </figure>
//   </div>
// </div>
