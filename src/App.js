import React, { Component } from 'react';
import './App.css';
import AddStopContainer from "./components/AddStopContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <AddStopContainer />
      </div>
    );
  }
}

export default App;
