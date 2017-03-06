const BASIC_URL = 'https://api.dribbble.com/v1';
const TOPICS =  'TOPICS';
const header = {
	method: 'GET',
	mode: 'cors',
	headers: {
		'Accept' : 'application/json',
		'Content-Type': 'text/plain',
		'Authorization': 'Bearer aeaa7f0a2a037ee0e021d23a0e3a1eb07b119d0217a31101c8d226631a10f1f6'
	}
};
const received = (type, shots) => {
	
	switch (type) {
		case TOPICS:
			return {
				"type": type,
				"payload": shots
			};

		default:
			return {};
	}

};

const actions = {

	getShots: function(){
		return function(dispatch) {
			fetchShots = () => dispatch => {

				const type = 'TOPICS';

				let data = {
					'shots': []
				};

				let url = BASIC_URL + '/shots';
				
				let request = new Request( url , header );

				fetch( request ).then( response => response.json() )
					.then( json => {
						data.shots = json;
						dispatch( received( type , data.shots ) );		
					})
			}
		}
	}
}

export default actions;