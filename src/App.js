import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
    <Router>
      <ScrollToTop>
        <div id="main">
          <Header />
          <Main />
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
    );
  }
}

export default App;
