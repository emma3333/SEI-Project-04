import React from 'react'
import { withRouter } from 'react-router-dom'

const Form = ({ handleChange, handleSubmit, data, errors}) => {
  return (
    <section>
      <div className="container is-fluid">
        <div className="formBox">
          <form onSubmit={handleSubmit}>
            <h1 className="title is-4">Add a pool</h1>
            <hr className="show-hr"/>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  placeholder="eg: Mermaid Pool"
                  onChange={handleChange}
                  value={data.name || ''}
                />
              </div>
              {errors.name && <div className="help is-danger">{errors.name}</div>}
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  className="input"
                  name="description"
                  placeholder="eg: A stunning small pool for a chilly dip"
                  onChange={handleChange}
                  value={data.description || ''}
                />
              </div>
              {errors.description && <div className="help is-danger">{errors.description}</div>}
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <input
                  className="input"
                  name="image"
                  placeholder="eg: https://wildswimming.com/images/swim.png"
                  onChange={handleChange}
                  value={data.image || ''}
                />
              </div>
              {errors.image && <div className="help is-danger">{errors.image}</div>}
            </div>

            <div className="field">
              <label className="label">Type</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="type"
                    onChange={handleChange}
                    value={data.type || ''}
                  >
                    <option value="" disabled>Please choose...</option>
                    <option value="lido">Lido</option>
                    <option value="lake">Lake</option>
                    <option value="Pond">Pond</option>
                    <option value="river">River</option>
                    <option value="sea">Sea</option>
                    <option value="tidal pool">Tidal Pool</option>
                  </select>
                </div>
                {errors.type && <div className="help is-danger">{errors.type}</div>}
              </div>
            </div>
            <div className="field">
              <label className="label">Region</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="region"
                    onChange={handleChange}
                    value={data.region || ''}
                  >
                    <option value="" disabled>Please choose...</option>
                    <option value="Greater London">Greater London</option>
                    <option value="South East">South East</option>
                    <option value="South West">South West</option>
                    <option value="West Midlands">West Midlands</option>
                    <option value="North West">North West</option>
                    <option value="North East">North East</option>
                    <option value="Yorkshire and the Humber">Yorkshire and the Humber</option>
                    <option value="East Midlands">East Midlands</option>
                    <option value="East of England">East of England</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Wales">Wales</option>
                  </select>
                </div>
                {errors.region && <div className="help is-danger">{errors.region}</div>}
              </div>
            </div>
            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <input
                  className="input"
                  name="address"
                  placeholder="eg: Hayfield, High Peak, S33 7ZJ"
                  onChange={handleChange}
                  value={data.address || ''}
                />
              </div>
              {errors.address && <div className="help is-danger">{errors.address}</div>}
            </div>
            <div className="field">
              <label className="label">Longitude</label>
              <div className="control">
                <input
                  className="input"
                  name="lng"
                  placeholder="eg: -1.846999"
                  onChange={handleChange}
                  value={data.lng || ''}
                />
              </div>
              {errors.lng && <div className="help is-danger">{errors.lng}</div>}
            </div>
            <div className="field">
              <label className="label">Latitude</label>
              <div className="control">
                <input
                  className="input"
                  name="lat"
                  placeholder="eg: 53.364384"
                  onChange={handleChange}
                  value={data.lat || ''}
                />
              </div>
              {errors.lat && <div className="help is-danger">{errors.lat}</div>}
            </div>

            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="country"
                    onChange={handleChange}
                    value={data.country || ''}
                  >
                    <option value="" disabled>Please choose...</option>
                    <option value='England'>England</option>
                    <option value='Scotland'>Scotland</option>
                    <option value='Wales'>Wales</option>
                  </select>
                </div>
              </div>
              {errors.country && <div className="help is-danger">{errors.country}</div>}
            </div>
            <div className="field">
              <label className="label">Heated</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="heated"
                    onChange={handleChange}
                    value={data.heated || ''}
                  >
                    <option value="" disabled>Please choose...</option>
                    <option value='yes'>Yes</option>
                    <option value='no'>No</option>
                  </select>
                </div>
              </div>
              {errors.heated && <div className="help is-danger">{errors.heated}</div>}
            </div>

            <button className="button submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Form)
