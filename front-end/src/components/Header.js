import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var Logo = require('../css/Logo.svg');
var Name = require('../css/Name.svg');
var SearchIcon = require('../css/SearchIcon.svg');

export default class Header extends Component {
    render() {
        return (
          <header>
            <div className='block block1'>
              <Link to={'/'}>
                <img className='logo' src={Logo} alt="logo"/>
              </Link>
              <img className='name' src={Name} alt='name'/>
            </div>
            <div className='block block2'>
              <p className='one-liner'>Interactive Wildlife Locator</p>
            </div>
            <div className='block block3'>
              <nav>
                <ul>
                  <li><Link to={'/'}><img className='button-icon' src={SearchIcon} alt="Search Icon"/></Link></li>
                  <li><Link to={'/list'}><img className='button-icon' src={SearchIcon} alt="Search Icon"/></Link></li>
                  <li><Link to={'/chart'}><img className='button-icon' src={SearchIcon} alt="Search Icon"/></Link></li>
                </ul>
              </nav>
            </div>
              <hr />
          </header>
        )
    }
}
