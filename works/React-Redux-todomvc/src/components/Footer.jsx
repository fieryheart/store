import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../actions/TodoActions';

class Footer extends React.Component {

	render() {

		const {state, Actions} = this.props;

		const size = state.willTodos + state.didTodos
		if (size === 0) {
			return null;
		}
		
		const remaining = state.todos.filter(todo => !todo.complete).length;
		const completed = state.todos.length - remaining;
		const phrase = remaining === 1 ? 'item left' : 'items left';

		let clearCompletedButton = null;
		if (completed > 0){
			clearCompletedButton = (
				<button
				      id="clear-completed"
				      onClick={Actions.deleteCompletedTodos}>
				     Clear completed ({completed})
				</button>);

		}

		return (
		   <footer id="footer">
		   	<span id="todo-count">
			 	<strong>
			 		{remaining}
			 	</strong>
			 	{phrase}
		   	</span>
		   	{clearCompletedButton}
		   </footer>
		);
	}

}

const select = state => ({
	state: state.Todo
})

const buildActionDispatcher = dispatch => ({
	Actions: bindActionCreators(Actions, dispatch)
})

export default connect(select, buildActionDispatcher)(Footer);