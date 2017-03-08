import { combineReducers } from 'redux';

const initialState = {
	'shots': []
}

const shotsReducer = (state=initialState, action) => {

	switch (action.type) {
		case 'GET_SHOTS':
			console.error(1);
			return {
				'shots' : action.payload
			}

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	shotsReducer
})

export default rootReducer;