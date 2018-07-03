// ChartView.js

import React, { Component } from 'react';

import Top from './chart/Top';
import Bars from './chart/Bars';
import PieChart from './chart/PieChart';

export default class ChartView extends Component {
    render() {
        return (
            <div>
            <Top />
            <Bars />
            <PieChart />
            </div>
        )
    }
}
