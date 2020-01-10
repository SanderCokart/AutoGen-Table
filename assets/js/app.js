import React from 'react';
import ReactDOM from 'react-dom';
import Screen from './components/Screen';
import TestContextProvider from './components/ContextExample';

function App() {
    return (
        <TestContextProvider>
            <Screen/>
        </TestContextProvider>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
