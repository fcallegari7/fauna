import React, { Component } from 'react';
import './App.css';

import ListView from './components/ListView';
import ChartView from './components/ChartView';
import MapView from './components/MapView';
import Terms from './components/Terms';
import About from './components/About';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

var Logo = require('./fauna.jpg');




  class App extends Component {
    render() {
      return (
      <Router>
        <div>
            <Link to={'/map'}><img  src={Logo} alt="logo"/></Link>
            <h2>Interactive Wildlife Locator</h2>
            <ul>
              <li><Link to={'/list'}>List View</Link></li>
              <li><Link to={'/chart'}>Chart View</Link></li>
              <li><Link to={'/map'}>Map View</Link></li>
              <li><Link to={'/terms'}>Terms and Conditions</Link></li>
              <li><Link to={'/about'}>About</Link></li>
            </ul>
            <hr />
            <Switch>
                <Route path='/list' component={ListView} />
                <Route path='/chart' component={ChartView} />
                <Route path='/map' component={MapView} />
                <Route path='/terms' component={Terms} />
                <Route path='/about' component={About} />
            </Switch>
        </div>
      </Router>
      );
    }
  }

  export default App;


  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }

//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         {this.state.users.map(user =>
//           <div key={user.id}>{user.username}</div>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
