import React from 'react';

import '../styles/index.css';

class App extends React.PureComponent {
    render(): JSX.Element {
        return (
            <div className="container">
                <div className="content">
                    <h1>Hello React!</h1>
                    <p>{`Generated by kuk's ReactTS`}</p>
                </div>
            </div>
        );
    }
}

export default App;