import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var Logo = require('../images/logo.svg');
var Name = require('../images/name.svg');
var MapViewIcon = require('../images/mapview.svg');
var ListViewIcon = require('../images/listview.svg');
var StatsViewIcon = require('../images/statsview.svg');
var SearchIcon = require('../images/search.svg');

export default class Header extends Component {
    render() {
        return (
          <header>
            <div className='block block1'>
              <Link to={'/'}>
                <img className='logo' src={Logo} alt="logo"/>
                <img className='name' src={Name} alt='name'/>
              </Link>
            </div>
            <div className='block block2'>
              <p className='one-liner'>Interactive Wildlife Locator</p>
            </div>
            <div className='block block3'>
              <nav>
                <ul>
                  <li><Link to={'/'}><img className='button-icon' src={MapViewIcon} alt="Search Icon"/></Link></li>
                  <li><Link to={'/list'}><img className='button-icon' src={ListViewIcon} alt="Search Icon"/></Link></li>
                  <li><Link to={'/chart'}><img className='button-icon' src={StatsViewIcon} alt="Search Icon"/></Link></li>
                </ul>
              </nav>
            </div>
              <hr />
          </header>
        )
    }
}
