var app = app || {};

// this.props.onSave()
// this.props.onDestroy()
// this.props.onCancel()

(function() {
	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	app.TodoItem = React.createClass({
		handleSubmit: function(event) {
			var val = this.state.editText.trim();
			if(val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
		},

		handleEdit: function() {
			
		},

		handleKeyDown: function(event) {
			if(event.which === ESCAPE_KEY) {
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			} else if(event.which === ENTER_KEY) {
				this.handleSubmit(event);
			}
		},

		handleChange: function(event) {
			if(this.props.editing) {
				this.setState({editText: event.target.value});
			}
		},

		getInitialState: function() {

		},

		shouldComponentUpdate: function() {

		},

		componentDidUpdate: function() {

		},

		render: function() {
			return (
				<li>
					
				</li>
				);
		}
	});
})();