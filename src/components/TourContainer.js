import React from 'react';
import AddStopContainer from "./AddStopContainer";
import TourCanvas from "./TourCanvas";

export default class TourContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stops: [],
            totalDistance: 0
        };
        this.fetchTour = this.fetchTour.bind(this);
    }

    componentDidMount() {
        this.fetchTour();
    }

    fetchTour() {
        fetch('https://safe-beyond-32236.herokuapp.com/tour', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            this.setState(responseJson);
        }).catch((err) => {
            alert("error: " + err);
        });
    }

    render() {
        return <div>
            <TourCanvas stops={this.state.stops} totalDistance={this.state.totalDistance} />
            <AddStopContainer handleStopCreated={ this.fetchTour } />
        </div>
    }

}