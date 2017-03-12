import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = {
	'shots': [],
	'showImage': false,
	'imageURL': null,
	'showDescription': false,
	'description': null,
	'showComments': false,
	'comments': []
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
			return fromJS(state).set('showDescription', true)
					.set('description', action.payload).toJS();
		
		case 'NOT_SHOW_DESCRIPTION':
			return fromJS(state).set('showDescription', false)
					.set('description', null).toJS();
		case 'SHOW_COMMENTS':
			return fromJS(state).set('showComments', true)
					.set('comments', action.payload).toJS();

		case 'NOT_SHOW_COMMENTS':
			return fromJS(state).set('showComments', false)
					.set('comments', []).toJS();

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	shotsReducer
})

export default rootReducer;