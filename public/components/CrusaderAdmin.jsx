import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Crusader.css";
import Crusaders from './Crusaders.jsx'

const ordens = ['Тау', 'Госпитальеры', 'О.Св.Гроба Господня', 'Тамплиеры', 'Сантьяго', 'Ависа', 'О.Св.Лазаря', 'Тевтонский'];


class CrusaderAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.crusader.idcrus,
            fio: this.props.crusader.firstName + " " + this.props.crusader.lastName,
            orden: this.props.crusader.orden,
            rank: this.props.crusader._rank
        };
        this.handleClickDel = this.handleClickDel.bind(this);
        this.handleChangeOrden = this.handleChangeOrden.bind(this);
        this.handleChangeRank = this.handleChangeRank.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
        
    }
    

    handleChangeOrden(e) {
        let value = e.target.value;
        this.setState({ orden: value });
    }

    handleChangeRank(e) {
        let value = e.target.value;
        this.setState({ rank: value });
    }

    handleClickDel(e) {
        e.preventDefault();
        fetch('http://localhost:9000/crusaders/data', {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idcrus: this.state.id})
        }).then(response=> response.json()).then(message => {
            console.log(message);
            
        });
        fetch('http://localhost:9000/crusaders/data').then(response => {
            if (response.status === 200)
                response.json().then(data => {
                    
                    ReactDOM.render(
                        <Crusaders crusadersList={data.info} role={data.role} />,
                        document.getElementById('content')
                    )
                })
        })
    }

    handleClickSubmit(e) {
        e.preventDefault();
        let sendingData ={
            'idcrus': this.state.id,
            'orden': this.state.orden,
            'rank': this.state.rank
        }
        
        fetch('http://localhost:9000/crusaders/data', {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendingData)
        }).then(response=> response.json()).then(message => {
            console.log(message);
            
        });
        
    }

    render() {

        return <div className="crusader-css" id={this.state.id}>
            <div className="avatat"><img src={'./resources/' + this.props.crusader.avatar} /></div>
            <div className="crusaders-info">
                <input type="submit" value="X" onClick={this.handleClickDel} className="delete-button" />
                <strong><p>{this.state.fio}</p></strong><br />
                <select value={this.state.orden} onChange={this.handleChangeOrden}>
                    {
                        ordens.map(val=>{
                            return <option value={val}>{val}</option>
                        })
                    }
                </select><br />
                <input type="text" value={this.state.rank} onChange={this.handleChangeRank} /><br />
                <input type="submit" value="OK" onClick={this.handleClickSubmit} />
            </div>

        </div>
    }
}

export default CrusaderAdmin;