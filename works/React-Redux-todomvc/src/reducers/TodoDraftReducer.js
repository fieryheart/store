'use strict';

import  { fromJS } from 'immutable';

export default (state = {
	text: ''
}, Actions) => {

	switch(Actions.type){
		
		case 'todo/ADD_TODO':
			return fromJS(state).setIn(['text'], '').toJS();
		case 'todo/UPDATE_DRAFT':
			return fromJS(state).setIn(['text'], Actions.payload).toJS();
		default:
			return state;
	}
}