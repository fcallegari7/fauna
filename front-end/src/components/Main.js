import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ListView from './ListView';
import ChartView from './ChartView';
import MapView from './MapView';
import Terms from './Terms';
import About from './About';

export default class Footer extends Component {
    render() {
        return (
          <Switch>
              <Route exact path='/' component={MapView} />
              <Route path='/list' component={ListView} />
              <Route path='/chart' component={ChartView} />
              <Route path='/terms' component={Terms} />
              <Route path='/about' component={About} />
              <Redirect to="/" />
          </Switch>
        )
    }
}
