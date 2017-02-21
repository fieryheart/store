import React from 'react';

import NewTodo from './NewTodo';

class Header extends React.Component {

	render() {

		return (
			<header id="header">
				<h1>fieryheart-todos</h1>
				<NewTodo />
			</header>
		);

	}

}

export default Header;