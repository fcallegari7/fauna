import React, { Component } from "react";
var FilterIconCaptive = require('../images/captivity.svg');
var FilterIconDate = require('../images/date.svg');
var FilterIconDistance = require('../images/distance.svg');
var SearchIcon = require('../images/search.svg');
var FilterIcon = require('../images/filter.svg');

export default class ListHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='listHeader'>
        <div className='listHeader-search'>
          <div className="button" onClick={() => this.toggleModal()}>
            <img className='button-icon' src={SearchIcon} alt="Search"/>
          </div>
          <input placeholder="search" />
        </div>
        <div className='listHeader-filters'>
          <div className="button" onClick={() => this.toggleModal()}>
            <img className='button-icon' src={FilterIcon} alt="Filters"/>
          </div>
          <nav>
            <ul>
              <li>
                  <div className="button" onClick={() => this.toggleModal()}>
                    <img className='button-icon' src={FilterIconDistance} alt="Filter by distance range"/>
                  </div>
              </li>
              <li>
                  <div className="button" onClick={() => this.toggleModal()}>
                    <img className='button-icon' src={FilterIconDate} alt="Filter by date"/>
                  </div>
              </li>
              <li>
                  <div className="button" onClick={() => this.toggleModal()}>
                    <img className='button-icon' src={FilterIconCaptive} alt="Filter by captive or wild"/>
                  </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
