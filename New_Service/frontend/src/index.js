import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from "react-redux";
import Store from "./util/Store";

ReactDOM.render(
    <Router>
        <Provider store={Store}>
            <App />
        </Provider>

    </Router>, 
    document.getElementById('root')
);

registerServiceWorker();
