import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var Logo = require('../fauna.jpg');

export default class Header extends Component {
    render() {
        return (
          <header>
              <Link to={'/'}><img  src={Logo} alt="logo"/></Link>
              <h2>Interactive Wildlife Locator</h2>
              <ul>
                <li><Link to={'/'}>Map View</Link></li>
                <li><Link to={'/list'}>List View</Link></li>
                <li><Link to={'/chart'}>Chart View</Link></li>
              </ul>
              <hr />
          </header>
        )
    }
}
