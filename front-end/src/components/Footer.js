import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Terms from './Terms';
import About from './About';

export default class Footer extends Component {
    render() {
        return (
          <footer>
              <hr />
              <ul>
                <li><Link to={'/terms'}>Terms and Conditions</Link></li>
                <li><Link to={'/about'}>About</Link></li>
              </ul>
          </footer>
        )
    }
}
