const BASIC_URL = 'https://api.dribbble.com/v1';
const header = {
	method: 'GET',
	mode: 'cors',
	headers: {
		'Accept' : 'application/json',
		'Content-Type': 'text/plain',
		'Authorization': 'Bearer aeaa7f0a2a037ee0e021d23a0e3a1eb07b119d0217a31101c8d226631a10f1f6'
	}
};


const actions = {

	fetchShots: () => (dispatch) => {

				// let url = BASIC_URL + '/shots';
				
				// let request = new Request(url, header);

				// fetch( request ).then( response => response.json() )
				// 	.then( (json) => {
				// 		dispatch( actions.getShots(json) );		
				// 	})
				// 	.catch((error) => {
				// 		console.error(error);
				// 	})
				
				let request = new Request('http://10.0.2.2:8888' , {
				  method: 'GET',
				  mode: 'cors',
				  headers: {
				    'Accept' : 'text/xml',
				    'Content-Type': 'text/plain;charset=UTF-8',
				  }
				});


				 fetch(request).then(response => response._bodyInit)
						.then(data => {
							let json = JSON.parse(data);
							dispatch( actions.getShots(json.shots) )
						})
				                      	.catch((error) => {
				                              		console.error(error);
				                     	});
				return {
					type:''
				};
	},

	getShots: (json) => ({
		type: 'GET_SHOTS',
		payload: json
	}),

	showImage: (imageURL) => ({
		type: 'SHOW_IMAGE',
		payload: imageURL
	}),

	notShowImage: () =>({
		type: 'NOT_SHOW_IMAGE'
	}),
	
	showDescription: (description) => ({
		type: 'SHOW_DESCRIPTION',
		payload: description
	}),

	notShowDescription: () => ({
		type: 'NOT_SHOW_DESCRIPTION'
	}),

	fetchComments: (commentsURL) => (dispatch) => {
				let request = new Request(commentsURL, {
				  method: 'GET',
				  mode: 'cors',
				  headers: {
				    'Accept' : 'text/xml',
				    'Content-Type': 'text/plain;charset=UTF-8',
				  }
				});


				 fetch(request).then(response => response._bodyInit)
						.then(data => {
							let json = JSON.parse(data);
							dispatch( actions.showComments(json.comments) )
						})
				                      	.catch((error) => {
				                              		console.error(error);
				                     	});
				return {
					type:''
				};
	},

	showComments: (comments) => ({

		type: 'SHOW_COMMENTS',
		payload: comments

	}),

	notShowComments: () => ({
		type: 'NOT_SHOW_COMMENTS'
	})
}

export default actions;