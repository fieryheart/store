import { combineReducers } from 'redux';

const shotsReducer = (state={}, action => {

	switch (action.type) {
		case 'TOPICS':
			return {
				'shots' : action.payload
			}

		default:
			return state;
	}
})

const rootReducer = combineReducers({
	shotsReducer
})

export default rootReducer;