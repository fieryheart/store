import React from 'react';

import classnames from 'classnames';

const ENTER_KEY_CODE = 13;

class TodoItem extends React.Component {

	render() {
		const {editing, todo, actions} = this.props;
		const isEditing = editing === todo.id;
		const onDeleteTodo = () => actions.deleteTodo( todo.id );
		const onStartEditingTodo = () => actions.startEditingTodo( todo.id );
		const onToggleTodo = () => actions.toggleTodo( todo.id );

		let input = null;
		if(isEditing) {
			const onChange = (event) => actions.editTodo( todo.id, event.target.value);
			const onKeyDown = (event) => {
				if (event.keyCode === ENTER_KEY_CODE) {
					actions.stopEditingTodo();
				}
			};
			input =
			  <input
			        autoFocus={true}
			        className="edit"
			        value={todo.text}
			        onBlur={actions.stopEditingTodo}
			        onChange={onChange}
			        onKeyDown={onKeyDown}
			  />;
		}


		return (
		   <li
		       className={classnames({
		       	completed: todo.complete,
		       	editing: isEditing
		       })}>
		       <div className="view">
			<input
			     className="toggle"
			     type="checkbox"
			     checked={todo.complete}
			     onChange={onToggleTodo}
			/>
			<label onDoubleClick={onStartEditingTodo}>
			     {todo.text}
			</label>
			<button className="destroy" onClick={onDeleteTodo} />
		       </div>
		       {input}
		   </li>
		);
	}

}

export default TodoItem;