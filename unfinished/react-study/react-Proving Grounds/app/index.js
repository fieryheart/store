import React from 'react';
import ReactDOM from 'react-dom';

class H1 extends React.Component {
	render(){
		return(
			<div>
				hello world
			</div>
		);
	}
}

ReactDOM.render(<H1 />, 
	document.getElementById('content'));


