import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';


  class App extends Component {
    render() {
      return (
      <Router>
        <div id="main">
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
      );
    }
  }

  export default App;
