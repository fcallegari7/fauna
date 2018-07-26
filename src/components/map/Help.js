import React from 'react'

var SearchImage = require('../../images/help-images/Search.svg');

const Header = () => (
    <div className='help-box'>
      <h2>Help</h2>
      <div className='row row1'>
        <div className='help-image'>
          Search
        </div>
        <div className='help-description'>
          <p>Click Search button to open search</p>
        </div>
      </div>

      <div className='row row2'>
        <div className='help-image'>Filter</div>
        <div className='help-description'>
          <p>Click Filters button to open filter menu</p>
          <ul>
            <li>
              <div className='help-filter-image'>Icon</div>
              <div className='help-filter-description'>
                <p>Distance</p>
              </div>
            </li>
            <li>
              <div className='help-filter-image'>Icon</div>
              <div className='help-filter-description'>
                <p>Date</p>
              </div>
            </li>
            <li>
              <div className='help-filter-image'>Icon</div>
              <div className='help-filter-description'>
                <p>Captivity</p>
              </div>
            </li>
          </ul>

        </div>

      </div>

      <div className='row row3'>
        <div className='help-image'>Pin</div>
        <div className='help-description'>
          <p>Click on a pin to learn more</p>
        </div>
      </div>
    </div>
)

export default Header
