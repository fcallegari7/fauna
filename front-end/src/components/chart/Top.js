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
          <h2 className="top-title">Most Sighted</h2>
          <img className='top-img' src={this.state.photo} alt="most sighted animal"/>
          <div className='top-info'>
            <p className='top-name'>{this.state.name}</p>
            <p className='top-name'>{this.state.count}<span className='top-label'>times</span></p>
          </div>
          <p className='top-link'><a href={this.state.wikipedia} target='_blank'>Learn more</a></p>
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
