import {combineReducers} from 'redux';
import cart from './CartReducer';


const RootReducer = combineReducers({
	cart
});

export default RootReducer;