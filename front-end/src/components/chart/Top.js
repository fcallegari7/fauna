// Top.js

import React, { Component } from 'react';
import Dropdown from './Dropdown';
var ApiService = require('../../services/Api').default;
var Api = new ApiService();

export default class Top extends Component {


  render() {
      return (
          <div>
                <Dropdown />
          </div>
      )
  }
}
