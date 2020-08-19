import React, { Component } from 'react';
import "../styles/Info.css";


class Item extends Component {
    render() {
        return <div className="rule">
            <h3>{this.props.rule.title}</h3>
            <p>{this.props.rule.description}</p>
        </div>
    }
};

class Info extends Component {
    render() {
        return <div>
            <div className="rules-background">

            </div>
            <div className="rules">
                <h2>Правила рыцаря</h2>
                {
                    this.props.rules.map(el => {
                        return <Item key="k" rule={el} />
                    })

                }
            </div>
        </div>

    }
};

export default Info;