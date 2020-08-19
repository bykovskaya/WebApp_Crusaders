import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../styles/Menu.css";
import Crusaders from './Crusaders.jsx';
import RegLog from './RegLog.jsx';
import Info from './Info.jsx';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { href: '' };
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);

    }

    handleClick1(event) {
        event.preventDefault();
        const url = event.target.href;

        fetch(url + '/data').then(response => {
            if (response.status === 200)
                response.json().then(data => {
                    

                    ReactDOM.render(
                        <Crusaders crusadersList={data.info} role={data.role} />,
                        document.getElementById('content')
                    )
                })
            if (response.status === 401)
                ReactDOM.render(
                    <RegLog />,
                    document.getElementById('content')
                )
        })
    }
    handleClick2(event) {
        event.preventDefault();
        const url = event.target.href;
        console.log(url);


    }
    handleClick3(event) {
        event.preventDefault();
        const url = event.target.href;
        fetch('http://localhost:9000/checklist').then(response => response.json()
        ).then(data => {
            ReactDOM.render(
                <Info rules={data} />,
                document.getElementById('content')
            )
        })
        

    }
    handleClick4(event) {
        event.preventDefault();
        const url = event.target.href;
        ReactDOM.render(
            <RegLog />,
            document.getElementById('content')
        )
    }
    render() {
        return <div className='head-internal'>
            <nav className="menu">
                <div className="menu-left">
                    <a href="http://localhost:9000/crusaders" onClick={this.handleClick1}>Крестоносцы</a>
                    <a href="http://localhost:9000/battles" onClick={this.handleClick2}>Битвы</a>
                    <a href="http://localhost:9000/checklist" onClick={this.handleClick3}>Законы крестоносцев</a>
                </div>
                <div className="menu-right">
                    <a className="rightest-link" href="http://localhost:9000/login" onClick={this.handleClick4}>Войти</a>
                </div>
            </nav>
        </div>
    }
}

export default Menu;
