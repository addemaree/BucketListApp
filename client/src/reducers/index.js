import { combineReducers } from 'redux';
import BandsReducer from './reducer_bands';
import SelectedBand from './reducer_selectedband';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
//import {
	//AUTH_USER,
	//UNAUTH_USER
//} from '../actions/types';
	
	//Define the properties of our Application state here
	const rootReducer = combineReducers({
		form: formReducer,
		auth: authReducer
	});

	export default rootReducer;