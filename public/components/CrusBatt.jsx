import React, { Component } from 'react';
//import "../styles/CrusBatt.css";

class CrusBatt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.battles.idbatt,
            name: this.props.battles.battleName,
            year: this.props.battles.year,
            link: this.props.battles.link
        }
        this.handleClickAdd = this.handleClickAdd.bind();
    }

    handleClickAdd(e) {
        e.preventDefault();
        fetch('http://localhost:9000/battles/info', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        }).then(response => response.json()).then(data => console.log(data));
    }

    render() {
        return <div className="crusbatt">
            <input type="text" value={this.state.battleName} />
            <input type="text" value={this.state.year} />
            <input type="text" value={this.state.link} />
            <input type="submit" value="+" onClick={this.handleClickAdd} className="add-battle-button" />
        </div>
    }
}



export default CrusBatt;