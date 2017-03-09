import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = {
	'shots': [],
	'showImage': false,
	'showDescription': false
}

const shotsReducer = (state=initialState, action) => {

	switch (action.type) {
		case 'GET_SHOTS':
			return fromJS(state).set('shots', action.payload).toJS();

		case 'SHOW_IMAGE':
			return fromJS(state).set('showImage', true).toJS();

		case 'SHOW_DESCRIPTION':
			return fromJS(state).set('showDescription', true).toJS();
			
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	shotsReducer
})

export default rootReducer;