import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ListView from './ListView';
import ChartView from './ChartView';
import MapView from './MapView';
import Terms from './Terms';
import About from './About';

var Logo = require('../fauna.jpg');

export default class Header extends Component {
    render() {
        return (
          <Router>
            <div>
                <Link to={'/'}><img  src={Logo} alt="logo"/></Link>
                <h2>Interactive Wildlife Locator</h2>
                <ul>
                  <li><Link to={'/'}>Map View</Link></li>
                  <li><Link to={'/list'}>List View</Link></li>
                  <li><Link to={'/chart'}>Chart View</Link></li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path='/' component={MapView} />
                    <Route path='/list' component={ListView} />
                    <Route path='/chart' component={ChartView} />
                    <Route path='/terms' component={Terms} />
                    <Route path='/about' component={About} />
                </Switch>
            </div>
          </Router>
        )
    }
}
