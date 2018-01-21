import React, { Component } from 'react';
import './App.css';
import AddStopContainer from "./components/AddStopContainer";
import TourCanvasContainer from "./components/TourCanvasContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
          <TourCanvasContainer/>
          <AddStopContainer />
      </div>
    );
  }
}

export default App;
