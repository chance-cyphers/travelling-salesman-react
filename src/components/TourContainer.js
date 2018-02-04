import React from 'react';
import AddStopContainer from "./AddStopContainer";
import TourCanvas from "./TourCanvas";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default class TourContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stops: [],
            totalDistance: 0
        };
        this.fetchTour = this.fetchTour.bind(this);
        this.clearStops = this.clearStops.bind(this);
        this.testWebsocket = this.testWebsocket.bind(this);
    }

    componentDidMount() {
        this.fetchTour();

        var socket = new SockJS("https://safe-beyond-32236.herokuapp.com/socket");
        var stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, function (frame) {
            console.log('stomp connect: ' + frame);
            stompClient.subscribe("/tour", (message) => {
                console.log("messages! " + message.body);
            });
        });
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

    clearStops() {
        console.log('clearing stops...')
        fetch('https://safe-beyond-32236.herokuapp.com/stop', {
            method: 'delete'
        }).catch((err) => {
            console.log("********************************************");
            console.log("error: " + err);
            console.log("********************************************");
        });
    }

    testWebsocket() {
        fetch('https://safe-beyond-32236.herokuapp.com/stop/test', {
            method: 'GET'
        }).catch((err) => {
            console.log("********************************************");
            console.log("error: " + err);
            console.log("********************************************");
        });
    }

    render() {
        return <div>
            <TourCanvas stops={this.state.stops} totalDistance={this.state.totalDistance}/>
            <AddStopContainer handleStopCreated={this.fetchTour}/>
            <button onClick={this.clearStops} >Clear</button>
            <br />
            <button onClick={this.testWebsocket} >Test</button>
        </div>
    }

}