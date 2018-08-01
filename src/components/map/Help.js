import React, { Component } from 'react'

var SearchIcon = require('../../images/searchicon.svg');
var FilterIcon = require('../../images/filter.svg');
var DistanceIcon = require('../../images/distance.svg');
var DateIcon = require('../../images/date.svg');
var CaptiveIcon = require('../../images/captivity.svg');
var PinIcon = require('../../images/pin.svg');
var HelpIcon = require('../../images/help.svg');
var CloseIcon = require('../../images/close.svg');

export default class Header extends Component {
  render() {
    return (
      <div className={"help"+(this.props.isOpen ? " open" : '')}>
        <div className="button button-small helpIcon" onClick={() => this.props.toggleModal('help')}>
          <img className="button-icon" src={HelpIcon} alt="Help" />
        </div>
        <div className='help-box'>
          <div className='help-title'>
            <h2>Help</h2><button onClick={() => this.props.toggleModal()}><img className="close-help" src={CloseIcon} alt="Close Help" /></button>
          </div>
          <div className='row row1'>
            <div className='help-image'>
              <img src={SearchIcon} alt="Search Icon"/>
            </div>
            <div className='help-description'>
              <p>Click Search button to open search</p>
            </div>
          </div>

          <div className='row row2'>
            <div className='help-image'>
              <img src={FilterIcon} alt="Filter Icon"/></div>
            <div className='help-description'>
              <p>Click Filters button to open filter menu</p>
              <ul>
                <li>
                  <div className='help-filter-image'>
                    <img src={DistanceIcon} alt="Distance Icon"/>
                  </div>
                  <div className='help-filter-description'>
                    <p>Distance</p>
                  </div>
                </li>
                <li>
                  <div className='help-filter-image'>
                    <img src={DateIcon} alt="Date Icon"/>
                  </div>
                  <div className='help-filter-description'>
                    <p>Date</p>
                  </div>
                </li>
                <li>
                  <div className='help-filter-image'>
                    <img src={CaptiveIcon} alt="Captivity Icon"/>
                  </div>
                  <div className='help-filter-description'>
                    <p>Captivity</p>
                  </div>
                </li>
              </ul>

            </div>

          </div>

          <div className='row row3'>
            <div className='help-image'>
              <img src={PinIcon} alt="Pin Icon"/>
            </div>
            <div className='help-description'>
              <p>Click on a pin to learn more</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
