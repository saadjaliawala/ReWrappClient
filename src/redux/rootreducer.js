import {combineReducers} from 'redux';

import UserDetails from './reducers/UserDetails';
import AdminState from './reducers/AdminState';
import CartItems from './reducers/CartItems';
import ChatMessages from './reducers/ChatMessages';





export default combineReducers({
UserDetails,
AdminState,
CartItems,
ChatMessages

});