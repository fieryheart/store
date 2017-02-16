// import ajax from '../services/ajax';

// const prefix = 'apple/';

let actions = {
		pickApple: () => (dispatch, getState) => {

			if(getState().isPicking)
				return;

			dispatch(actions.beginPickApple());

			fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
				.then(res => {
					if(res.status != 200) dispatch(actions.failPickApple(res.statusText));

					let weight = Math.floor(200 + Math.random() * 50);
					dispatch(actions.donePickApple(weight));

				}).catch(e => {
					dispatch(actions.failPickApple(e.statusText));
				})
		},

		beginPickApple: () => ({
			type: 'apple/BEGIN_PICK_APPLE'
		}),

		donePickApple: appleWeight => ({
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
	};


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