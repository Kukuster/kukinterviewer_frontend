import React from 'react';
import logo from './logo.svg';
import './Kukapp.css';

export default function Kukapp() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <p>hello from kukApp component</p>
        </div>
    );
};
