import React from "react";
import {RingLoader} from "react-spinners";

export default class TourCanvas extends React.Component {

    componentDidUpdate() {
        let stops = this.props.stops;
        if(stops.length < 1) return;

        let ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, 300, 300);
        ctx.beginPath();
        ctx.moveTo(stops[stops.length-1].x, stops[stops.length-1].y);
        for(let i = 0 ; i < stops.length ; i++) {
            let x = stops[i].x;
            let y = stops[i].y;
            ctx.lineTo(x, y);
            ctx.fillRect(x-2, y-2, 4, 4);
        }
        ctx.stroke();
    }

    render() {
        return <div>
            <RingLoader color={'#123abc'} loading={this.props.stops.length <= 0} />
            <canvas ref="canvas" width={300} height={300} />
            <p>Tour Distance: {this.props.totalDistance}</p>
            <p>Number of Stops: {this.props.stops.length}</p>
        </div>
    }

}