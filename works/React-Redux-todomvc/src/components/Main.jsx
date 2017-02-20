import React from 'react';
import { connect } from 'react-redux';

import Actions from '../actions/TodoActions';
import TodoItem from './TodoItem';

class Main extends React.Component {
	
	render(){
		
		const {state, dispatch} = this.props;

		const size = state.willTodos + state.didTodos;
		// if (size === 0) {
		// 	return null;
		// }

		const areAllComplete = state.todos.every(todo => todo.complete);

		return (
			<section id="main">
				<input
				    checked={areAllComplete ? 'checked' : ''}
				    id="toggle-all"
				    type="checkbox"
				    onChange={() => dispatch( Actions.toggleAllTodos )}
				    />
				<label htmlFor="toggle-all">
				     Mark all as complete
				</label>
				<ul id="todo-list">
				      {
				      	state.todos.map(todo => (
					   <TodoItem
					         key={todo.id}
					         editing={todo.editing}
					         todo={todo}
					         onDeleteTodo={(id) => dispatch( Actions.deleteTodo(id) )}
					         onEditTodo={(id, text) => dispatch( Actions.editTodo(id, text) )}
					         onStartEditingTodo={(id) => dispatch( Actions.startEditingTodo(id) )}
					         onStopEditingTodo={() => dispatch( Actions.stopEditingTodo() )}
					         onToggleTodo={(id) => dispatch( Actions.toggleTodo(id) )}
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

export default connect(select)(Main);