import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../actions/TodoActions';

const ENTER_KEY_CODE = 13;

class NewTodo extends React.Component {
	
	render() {
		let {state, Actions} = this.props;
		let {text} = state;
		const addTodo = Actions.addTodo;
		// const onBlur = (text) => addTodo();
		const updateDraft = Actions.updateDraft;
		const onChange = (event) => {
			updateDraft(event.target.value);
		};
		const onKeyDown = (event) => {

			if(event.keyCode === ENTER_KEY_CODE) {

				addTodo(text);
			}
		}


		return (
			<input
			    autoFocus={true}
			    id="new-todo"
			    placeholder="What needs to be done?"
			    value={text}

			    onChange={onChange}
			    onKeyDown={onKeyDown}
			/>
		);

	}

}

const select = state => ({
	state: state.TodoDraft
})

const buildActionDispatcher = dispatch => ({
	Actions: bindActionCreators(Actions, dispatch)
})

export default connect(select, buildActionDispatcher)(NewTodo);