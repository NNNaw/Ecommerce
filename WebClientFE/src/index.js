import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
//cấu hình Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from './Redux/Roots';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
    const enhancer = composeEnhancers(
      applyMiddleware(reduxThunk),
      // other store enhancers if any
    );

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider >
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
