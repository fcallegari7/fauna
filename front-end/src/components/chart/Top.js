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

    const photo = this.props.value.photo
    const name = this.props.value.common_name
    const count = this.props.value.count
    const wikipedia = this.props.value.wiki

    this.setState({
      photo: photo,
      name: name,
      count: count,
      wikipedia: wikipedia
    })
  }

  render() {
    if (Object.keys(this.state.name).length > 0) {
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
      // Need to add a no results option
      return (
        <div>Loading...</div>
      );
    }
  }
}
