const BASIC_URL = 'https://api.dribbble.com/v1/shots'

const header = {
	method: 'GET',
	mode: 'cors',
	headers: {
		'Accept' : 'application/json',
		'Content-Type': 'text/plain',
		'Authorization': 'Bearer b71d32739fc3b576fbc59ee2a094a91cd1b1cab71edea734201b942ab0d1c597'
	}
}

var shotsPage = 1
var commentsPage = 1
var commentsURL = '';

const actions = {

	fetchShots: () => (dispatch) => {

				let url = BASIC_URL + "?page=" + shotsPage++;
				
				let request = new Request(url, header);

				fetch( request ).then( response => response.json() )
					.then( (json) => {
						dispatch( actions.getShots(json) );		
					})
					.catch((error) => {
						console.error(error);
					})

	//模拟接口时用的URL

				// let request = new Request('http://10.0.2.2:8888' , {
				//   method: 'GET',
				//   mode: 'cors',
				//   headers: {
				//     'Accept' : 'text/xml',
				//     'Content-Type': 'text/plain;charset=UTF-8',
				//   }
				// });


				//  fetch(request).then(response => response._bodyInit)
				// 		.then(data => {
				// 			let json = JSON.parse(data);
				// 			dispatch( actions.getShots(json.shots) )
				// 		})
				//                       	.catch((error) => {
				//                               		console.error(error);
				//                      	});
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
	
	//模拟接口时用的URL
	// fetchComments: (commentsURL) => (dispatch) => {
	// 			let request = new Request(commentsURL, {
	// 			  method: 'GET',
	// 			  mode: 'cors',
	// 			  headers: {
	// 			    'Accept' : 'text/xml',
	// 			    'Content-Type': 'text/plain;charset=UTF-8',
	// 			  }
	// 			});


	// 			 fetch(request).then(response => response._bodyInit)
	// 					.then(data => {
	// 						let json = JSON.parse(data);
	// 						dispatch( actions.showComments(json.comments) )
	// 					})
	// 			                      	.catch((error) => {
	// 			                              		console.error(error);
	// 			                     	});
	// 			return {
	// 				type:''
	// 			};
	// },

	fetchComments: (url) => (dispatch) => {
				
				commentsURL = url ? url : commentsURL;

				console.error(commentsURL);

				let request = new Request(commentsURL + '?page=' + commentsPage++ , header)


				 fetch(request).then(response => response.json())
						.then(json => {
							dispatch( actions.showComments(json) )
						})
				                      	.catch((error) => {
				                              		console.error(error)
				                     	});
				return {
					type:''
				}
	},


	showComments: (comments) => ({

		type: 'SHOW_COMMENTS',
		payload: comments

	}),

	notShowComments: () => {
		// 评论页数变为1
		commentsPage = 1
		return ({
			type: 'NOT_SHOW_COMMENTS'
		})
	} 
}

export default actions;