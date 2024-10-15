import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './Reducers/rootReducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './assets/fonts/fonts.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faSearch, faChevronLeft, faChevronRight, faTimes, faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner, faSearch, faChevronLeft, faChevronRight, faTimes, faChevronUp, faChevronDown, faPlus);

const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
