'use strict';

export default (state = {
	text: ' '
}, Actions) => {
	switch(Actions.type){
		case 'todo/ADD_TODO':
			return Object.assign({}, state, {
				text: ''
			});
		case 'todo/UPDATE_DRAFT':
			return Object.assign({}, state, {
				text: Actions.preload
			});
		default:
			return state;
	}
}