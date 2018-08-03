import React, { Component } from "react"
import Slider from 'react-rangeslider'
// https://whoisandy.github.io/react-rangeslider/
import 'react-rangeslider/lib/index.css'

export default class Distance extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      distance: 0
    };
  }

  handleOnChange = (value) => {
    this.setState({
      distance: value
    })
  }

  render() {
      let { distance } = this.state
      return (
        <Slider
          min= {1}
          max= {60}
          value={distance}
          orientation="horizontal"
          onChange={this.handleOnChange}
          labels={ {1:'1km', 30:'30km', 60:'60km'} }

        />
      )
    }
  }
