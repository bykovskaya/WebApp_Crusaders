import React, { Component } from 'react';
import CrusaderUsers from './CrusaderUsers.jsx';
import CrusaderAdmin from './CrusaderAdmin.jsx';
import CrusadersForm from './CrusadersForm.jsx';
import "../styles/Menu.css";



class Crusaders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className='crusaders'>
            {(this.props.role === "админ")? <CrusadersForm/> : ""}
            {
                this.props.crusadersList.map((data) => {
                    if (this.props.role === "админ")
                        return <CrusaderAdmin key={data.id} crusader={data} battles={this.props.battles} />
                    else
                        return <CrusaderUsers key={data.id} crusader={data}/>
                })
            }
        </div>
    }
}

export default Crusaders;