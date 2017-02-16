import ajax from '../services/ajax';

const prefix = 'apple/';

let actions = {
	pickApple: () => (dispatch, getState) => {

		if(getState().isPicking)
			return;

		dispatch(actions.beginPickApple());

		ajax({
			url: '/appleBasket/pickApple',
			method: 'GET'
		}).done(data => {
			dispatch(actions.donePickApple(data.weight))
		})
		.fail(xht => {
			dispatch(actions.failPickApple(xhr.responseText));
		}),

		beginPickApple: () => ({
			type: 'apple/BEGIN_PICK_APPLE'
		}),

		donPickApple: appleWeight => ({
			type: 'apple/DONE_PICK_APPLE',
			payload: appleWeight
		}),

		failPickApple: errMsg => ({
			type: 'apple/FAIL_PICK_APPLE',
			payload: new Error(errMsg),
			error: true
		}),

		eatApple: appleId => ({
			type: 'apple/EAT_APPLE',
			payload: appleId
		})
	}
}

export default actions;

/*
	let pickAppleAction = (dispatch, getState) => {
		ajax({
			url: '/pickApple',
			method: 'GET',
		})
		.done(data => {
			dispatch({
				type: 'DONE_PICK_APPLE',
				payload: data.weight
			});
		})
		.fail(xhr => {
			dispatch({
				type: 'FAIL_PICK_APPLE',
				payload: new Error(xhr.responseText),
				error: true
			});
		})
	}

	dispatch( pickAppleAction )
*/ 