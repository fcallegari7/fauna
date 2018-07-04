// Top.js

import React, { Component } from 'react';
import Dropdown from './Dropdown';
import { compose, withState, withHandlers } from "recompose";
var ApiService = require('../../services/Api').default;
var Api = new ApiService();

export const Top = compose ()(
  props => <div>{JSON.stringify(props.value)}</div>
)
