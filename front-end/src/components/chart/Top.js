// Top.js

import React, { Component } from "react";

export default class Top extends Component {
  constructor(props){
    super(props);
    this.state = {
      photo: '',
      name: '',
      count: '',
      wikipedia: ''
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value === this.props.value) {
      return;
    }

    const photo = this.props.value[0].photo
    const name = this.props.value[0].common_name
    const count = this.props.value[0].count
    const wikipedia = this.props.value[0].wiki

    this.setState({
      photo: photo,
      name: name,
      count: count,
      wikipedia: wikipedia
    })
  }

  render() {
    if (Object.keys(this.state.photo).length > 0) {
      return (
        <div>
          <h1>Most sighted animal</h1>
          <img src={this.state.photo} alt="most sighted animal"/>
          <p>{this.state.name}</p>
          <p>{this.state.count}</p>
          <p>{this.state.wikipedia}</p>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
