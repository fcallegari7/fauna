// ChartView.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Top from './chart/Top';
import Bars from './chart/Bars';
import PieChart from './chart/PieChart';

export default class ChartView extends Component {
    render() {
        return (
            <div>
            <Router>
              <div>
                  <ul>
                    <li><Link to={'/chart/'}>Top Animal</Link></li>
                    <li><Link to={'/chart/bars'}>Bars Chart</Link></li>
                    <li><Link to={'/chart/pie'}>Pie Chart</Link></li>
                  </ul>
                  <hr />
                  <Switch>
                      <Route exact path='/chart/' component={Top} />
                      <Route path= '/chart/bars' component={Bars} />
                      <Route path='/chart/pie' component={PieChart} />
                  </Switch>
              </div>
            </Router>


            </div>
        )
    }
}
