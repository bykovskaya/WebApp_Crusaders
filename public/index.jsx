import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/Menu.jsx';
import Info from './components/Info.jsx';

ReactDOM.render(
    <Menu />,
    document.getElementById('head')
);

fetch('http://localhost:9000/checklist').then(response => response.json()
).then(data => {
    console.log(data);
    ReactDOM.render(
        <Info rules={data} />,
        document.getElementById('content')
    )
})

