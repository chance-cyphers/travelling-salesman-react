import React from "react";
import AddStopPresenter from "./AddStopPresenter";

export default class AddStopContainer extends React.Component {

    constructor(props) {
        super(props);
        this.postStop = this.postStop.bind(this);
    }

    render() {
        return <AddStopPresenter handleSubmit={this.postStop}/>;
    }

    postStop(stop) {
        if (stop.x > 300 || stop.y > 300 || stop.x < 0 || stop.y < 0) {
            alert('x and y must be >= 0 and < 300');
            return;
        }
        fetch('https://safe-beyond-32236.herokuapp.com/stop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stop)
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            this.props.handleStopCreated();
        }).catch((err) => {
            alert("error: " + err);
        });
    }

}