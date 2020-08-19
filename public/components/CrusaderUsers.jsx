import React from 'react';
import "../styles/Crusader.css";
import CrusBatt from "./CrusBatt.jsx"

class CrusaderUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.pic = new Blob();
    }

    render() {

        return <div className="crusader-css" id={this.props.crusader.id}>
            <div className="avatat"><img src={'./resources/' + this.props.crusader.avatar} /></div>
            <div className="crusaders-info">
                <strong><p className="FIO">{this.props.crusader.firstName + " " + this.props.crusader.lastName}</p></strong>
                <p>{this.props.crusader.orden}</p>
                <p>{this.props.crusader._rank}</p>
            </div>
            <CrusBatt battles={this.props.battles}/>
        </div>
    }
}


export default CrusaderUsers;