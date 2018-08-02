import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactSVG from "react-svg";

const Logo = require('../images/logo.svg');
const Name = require('../images/name.svg');
const MapViewIcon = require('../images/mapview.svg');
const ListViewIcon = require('../images/listview.svg');
const StatsViewIcon = require('../images/statsview.svg');

export default class Header extends Component {
    render() {
        return (
          <header>
            <div className='wrapper'>
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
                    <li>
                      <NavLink exact={true} activeClassName='active' className="button" to={'/'}>
                        <ReactSVG className='button-icon' svgClassName='svg-icon' path={MapViewIcon} alt="Map View"/>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact={true} activeClassName='active' className="button" to={'/list'}>
                        <ReactSVG className='button-icon' svgClassName='svg-icon' path={ListViewIcon} alt="List View"/>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact={true} activeClassName='active' className="button" to={'/chart'}>
                        <ReactSVG className='button-icon' svgClassName='svg-icon' path={StatsViewIcon} alt="Chart View"/>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        )
    }
}
