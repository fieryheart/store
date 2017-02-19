import React from 'react';

import classnames from 'classnames';

const ENTER_KEY_CODE = 13;

class TodoItem extends React.Component {

	render() {
		const {editing, todo} = this.props;
		const isEditing = editing === todo.id;
		const onDeleteTodo = () => this.props.onDeleteTodo.binds(this, todo.id);
		const onStartEditingTodo = () => this.props.onStartEditingTodo.binds(this, todo.id);
		const onToggleTodo = () => this.props.onToggleTodo.binds(this, todo.id);

		let input = null;
		if(isEditing) {
			const onChange = (event) => this.props.onEditTodo.binds(this, todo.id, event.target.value);
			const onStopEditingTodo = this.props.onStopEditingTodo.binds(this);
			const onKeyDown = (event) => {
				if (event.keyCode === ENTER_KEY_CODE) {
					onStopEditingTodo();
				}
			};
			input =
			  <input
			        autoFocus={true}
			        className="edit"
			        value={todo.text}
			        onBlur={onStopEditingTodo}
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