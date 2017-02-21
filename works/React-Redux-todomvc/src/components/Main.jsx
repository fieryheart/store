import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import Actions from '../actions/TodoActions';
import TodoItem from './TodoItem';

class Main extends React.Component {
	
	render(){

		const {state, Actions} = this.props;
			
		const size = state.willTodos + state.didTodos;
		if (size === 0) {
			return null;
		}
		

		const areAllComplete = state.todos.every(todo => todo.complete);
		
		return (
			<section id="main">
				<input
				    checked={areAllComplete ? 'checked' : ''}
				    id="toggle-all"
				    type="checkbox"
				    onChange={Actions.toggleAllTodos}
				    />
				<label htmlFor="toggle-all">
				     Mark all as complete
				</label>
				<ul id="todo-list">
				      {
				      	state.todos.map(todo => (
					   <TodoItem
					         key={todo.id}
					         editing={state.editing}
					         todo={todo}
					         actions={{
					         	deleteTodo: Actions.deleteTodo,
					         	editTodo: Actions.editTodo,
					         	startEditingTodo: Actions.startEditingTodo,
					         	stopEditingTodo: Actions.stopEditingTodo,
					         	toggleTodo: Actions.toggleTodo
					         }}
					   />
				      	))
				      }
				</ul>
			</section>
		);
	}

}

const select = state => ({
	state: state.Todo
})

const buildActionDispatcher = dispatch =>({
	Actions: bindActionCreators(Actions, dispatch)
})

export default connect(select, buildActionDispatcher)(Main);