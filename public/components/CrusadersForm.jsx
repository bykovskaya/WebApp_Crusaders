import React, { Component } from 'react';
import "../styles/Crusader.css";
import Crusaders from './Crusaders.jsx'

const ordens = ['Тау', 'Госпитальеры', 'О.Св.Гроба Господня', 'Тамплиеры', 'Сантьяго', 'Ависа', 'О.Св.Лазаря', 'Тевтонский'];


class CrusadersForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            orden: '',
            rank: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeOrden = this.handleChangeOrden.bind(this);
        this.handleChangeRank = this.handleChangeRank.bind(this);
        this.handleClickSubmit = this.handleClickSubmit.bind(this);
        this.fileInput = React.createRef();

    }

    handleChangeName(e) {
        let value = e.target.value;
        this.setState({ firstName: value });
    }
    handleChangeLastName(e) {
        let value = e.target.value;
        this.setState({ lastName: value });
    }
    handleChangeOrden(e) {
        let value = e.target.value;
        this.setState({ orden: value });
    }

    handleChangeRank(e) {
        let value = e.target.value;
        this.setState({ rank: value });
    }

    handleClickAdd(e) {
        e.preventDefault();

    }

    handleClickSubmit(e) {
        e.preventDefault();

        let empty = false;
        const sendingData = new FormData();

        empty = ((this.state.name === '')
            || (this.state.lastName === '')
            || (this.state.rank === ''));

        if (!empty) {
            sendingData.append('firstName', this.state.firstName);
            sendingData.append('lastName', this.state.lastName);
            sendingData.append('rank', this.state.rank);
            sendingData.append('orden', this.state.orden);
            sendingData.append('avatar', this.fileInput.current.files[0]);
            
            fetch('http://localhost:9000/crusaders/data', {
                method: "post",
                body: sendingData
            }).then(response => response.json()).then(message => {
                console.log(message);
            });
            this.setState({firstName: '', lastName: '', rank: ''})
        }
        else
            alert("Заполните все поля формы, пожалуйста!");
    }

    render() {
        return <div className="crusader-css" >
            <div className="avatat"><img src={'./resources/avatar-1024x1024.jpg'} /><br />
                <input type="file" ref={this.fileInput} accept="image/*" />
            </div>

            <div className="crusaders-info">
                <input type="text" value={this.state.firstName} onChange={this.handleChangeName} />
                <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} /><br />
                <select value={this.state.orden} onChange={this.handleChangeOrden}>
                    {
                        ordens.map(val => {
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

export default CrusadersForm;