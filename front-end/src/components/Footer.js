import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
          <footer>
              <div className='footer-text'>
                <Link to={'/terms'}>Terms and Conditions</Link>
                <span>|</span>
                <Link to={'/about'}>About</Link>
              </div>
          </footer>
        )
    }
}
