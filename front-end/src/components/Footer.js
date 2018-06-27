import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Terms from './Terms';
import About from './About';

export default class Footer extends Component {
    render() {
        return (
          <Router>
            <div>
                <hr />
                <ul>
                  <li><Link to={'/terms'}>Terms and Conditions</Link></li>
                  <li><Link to={'/about'}>About</Link></li>
                </ul>
            </div>
          </Router>
        )
    }
}
