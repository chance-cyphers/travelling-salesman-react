import React from "react";

export default class AddStopPresenter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            x: 0.0,
            y: 0.0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    }

    handleSubmit(event) {
        this.props.handleSubmit(this.state);
        event.preventDefault();
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <label>Name:
                <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
            </label><br/>
            <label>X:
                <input name="x" type="number" value={this.state.x} onChange={this.handleChange}/>
            </label><br/>
            <label>Y:
                <input name="y" type="number" value={this.state.y} onChange={this.handleChange}/>
            </label><br/>
            <input type="submit" value="Submit"/>
        </form>;
    }

    postStop() {
        fetch('https://safe-beyond-32236.herokuapp.com/stop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                x: 5.5,
                y: 6.0,
                name: "zack t react-ey"
            })
        });

    }

}