import React, { Component } from 'react';
import Homepage from './components/HomePage'
import DashBoard from './components/DashBoard'
import { BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div id="app">
          <Router basename={process.env.PUBLIC_URL}>
            <div className="router">
              <Route 
                path="/dashboard" 
                render={(props) => <DashBoard {...props}/>} 
              />

              <Route 
                exact path = "/"
                render={()=><Homepage/>}
              />

              
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
