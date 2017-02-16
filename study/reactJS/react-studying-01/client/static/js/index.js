var React = require('react');
var ReactDOM = require('react-dom');
var myData = require('./getMessage');





class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
		this.getData = this.getData.bind(this);
		this.getValue = this.getValue.bind(this);
		this.getData();
		
	}
	render() {
		var inputValue = this.state.inputValue;

	 	return	<div>
				<input type="text"  className="input" defaultValue={inputValue} ref="myTextInput" />
				<button onClick={this.getValue}>getValue</button>
				<p ref="text">{inputValue}</p>
			</div>;
	}
	getData() {
		var self = this;
		//应用回调解决异步问题
		myData.getData(function(data) {
			self.state.inputValue = data;
			self.refs.myTextInput.value = data;
			self.refs.text.innerHTML = data
		});
	
	}

	getValue() {
		var inputText = this.refs.myTextInput.value;
		this.refs.text.innerHTML = inputText;
	}
}

ReactDOM.render(
	<Container />,
	document.getElementById('main-container')
);