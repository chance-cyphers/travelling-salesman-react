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
            totalDistance: 0,
            isLoadingTour: false
        };
        this.fetchTour = this.fetchTour.bind(this);
        this.clearStops = this.clearStops.bind(this);
        this.testWebsocket = this.testWebsocket.bind(this);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            isLoadingTour: true
        });
        this.fetchTour();
        this.setupWebsocket();
    }

    setupWebsocket() {
        var socket = new SockJS("https://safe-beyond-32236.herokuapp.com/socket");
        var stompClient = Stomp.over(socket);
        stompClient.debug = null;
        stompClient.connect({}, () => {
            stompClient.subscribe("/tour", (message) => {
                console.log("messages!: " + message.body);
                this.fetchTour();
            });
        });
    }

    fetchTour() {
        console.log('fetching new tour');
        fetch('https://safe-beyond-32236.herokuapp.com/tour', {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            this.setState({
                stops: responseJson.stops,
                totalDistance: responseJson.totalDistance,
                isLoadingTour: false
            });
        }).catch(this.displayError);
    }

    clearStops() {
        console.log('clearing stops...')
        fetch('https://safe-beyond-32236.herokuapp.com/stop', {
            method: 'delete'
        }).catch(this.displayError);
    }

    render() {
        return <div>
            <TourCanvas
                stops={this.state.stops}
                totalDistance={this.state.totalDistance}
                isLoading={this.state.isLoadingTour}/>
            <AddStopContainer />
            <button onClick={this.clearStops} >Clear</button>
        </div>
    }

    displayError(err) {
        console.log("********************************************");
        console.log("error: " + err);
        console.log("********************************************");
    }

}