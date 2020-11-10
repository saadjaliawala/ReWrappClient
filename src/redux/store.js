import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './rootreducer';

const middleware = applyMiddleware(thunk);

const store = createStore(rootreducer, middleware);

export default store;