import React, { Component } from 'react';
import "../styles/RegLog.css";

class RegLog extends Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', message: '', action: '' };
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        let value = e.target.value;
        this.setState({ action: value });
    }
    onChangeLogin(e) {
        let value = e.target.value;
        this.setState({ login: value });
    }
    onChangePassword(e) {
        let value = e.target.value;
        this.setState({ password: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let url = '';
        let empty = false;

        if (this.state.login === '' || this.state.password === '') {
            alert("Заполните все поля формы!");
            empty = true;
        }
        if (this.state.action === "Register")
            url = 'http://localhost:9000/user/reg';
        else
            url = 'http://localhost:9000/user/log';
        if (!empty)
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: this.state.login, password: this.state.password })
            }).then(response => response.json()).then(data => {
                this.setState({ message: data.message })
            }).catch(error => console.log(error));
        this.setState({ login: '', password: '' });
    }

    render() {
        return (
            <form className="registration-form" onSubmit={this.handleSubmit}>
                
                <label>Login:</label><br />
                <input className="field" type="text" value={this.state.login} onChange={this.onChangeLogin} /><br />
                <label>Password</label><br />
                <input className="field" type="password" value={this.state.password} onChange={this.onChangePassword} /><br /><br />
                <input className="button" type="submit" value="Register" onClick={this.onClick} />
                <input className="button" type="submit" value="LogIn" onClick={this.onClick} />
                <p className='message'>{this.state.message}</p>
            </form >
        );
    }
}

export default RegLog