import React from "react";
import TourCanvas from "./TourCanvas";

export default class TourCanvasContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stops: [],
            totalDistance: 0
        };
    }

    componentDidMount() {
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
        return <TourCanvas stops={this.state.stops} totalDistance={this.state.totalDistance} />
    }

}