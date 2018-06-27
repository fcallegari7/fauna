import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Link, Route } from 'react-router-dom';


  class App extends Component {
    render() {
      return (
      <div>
        <Header />

        <Footer />
      </div>
      );
    }
  }

  export default App;
