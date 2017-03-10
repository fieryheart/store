import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = {
	'shots': [],
	'showImage': false,
	'imageURL': null,
	'showDescription': false,
	'description': null
}

const shotsReducer = (state=initialState, action) => {

	switch (action.type) {
		case 'GET_SHOTS':
			return fromJS(state).set('shots', action.payload).toJS();

		case 'SHOW_IMAGE':
			return fromJS(state).set('showImage', true)
					.set('imageURL', action.payload).toJS();

		case 'NOT_SHOW_IMAGE':
			return fromJS(state).set('showImage', false)
					.set('imageURL', null).toJS();


		case 'SHOW_DESCRIPTION':
			return fromJS(state).set('showDescription', action.payload).toJS();
			
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	shotsReducer
})

export default rootReducer;