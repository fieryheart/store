import React from 'react';
import { connect } from 'react-redux';

import Actions from '../actions/TodoActions';

const ENTER_KEY_CODE = 13;

class NewTodo extends React.Component {
	
	render() {
		let {state, dispatch} = this.props;
	
		const addTodo = (text) => dispatch(Actions.addTodo(text));
		// const onBlur = (text) => addTodo();
		const onChange = (event) => dispatch(Actions.upDateDraft( event.target.value) );
		const onKeyDown = (event) => {
			if(event.keyCode === ENTER_KEY_CODE) {
				addTodo(state.TodoDraft.text);
				console.log('enter');
			}
		}
		


		return (
			<input
			    autoFocus={true}
			    id="new-todo"
			    placeholder="What needs to be done?"
			    value={state.TodoDraft.text}

			    onChange={onChange}
			    onKeyDown={onKeyDown}
			/>
		);

	}

}

const select = state => ({
	state: state
})

export default connect(select)(NewTodo);