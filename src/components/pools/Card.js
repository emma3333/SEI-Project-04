import React from 'react'

const Card = ({ image, name }) => {
  return (
    <div className="card">
      <figure className="image is-4by3 cardclass">
        <img src={image} alt={name} />
      </figure>
    </div>
  )
}

export default Card


// <header className="card-header">
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
