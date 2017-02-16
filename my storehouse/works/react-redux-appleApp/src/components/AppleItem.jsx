import React from 'react';
import '../styles/appleItem.scss';

class AppleItem extends React.Component {

	shouldComponentUpdate(nextProps) {
		return nextProps.state != this.props.state;
	}

	render() {
	
		let { apple, actions } = this.props;

		// let mockState = {
		// 	id: 1,
		// 	weight: 256,
		// 	isEaten: false
		// };

		// let mockActions = {
		// 	eatApple : id =>{console.log('eatApple', id);},
		// 	foo: (arg1, arg2) => {console.log('foo', arg1, arg2);}
		// };

		// state = mockState;;actions = mockActions;


		return (
			<div className="appleItem">
				<div className="apple"><img src="../images/apple.png" alt=""/></div>
				<div className="info">
					<div className="name">红苹果 - {apple.id}号</div>
					<div className="weight">{apple.weight}号</div>
				</div>
				<div className="btn-div"><button onClick={ actions.eatApple.bind(this, apple.id ) }>吃掉</button></div>
			</div>
		);
	}
}

// AppleItem.propTypes = {
//     eatApple: React.PropTypes.func.isRequired,   // 吃苹果的回调，已通过bindActionCreators包装成dispatch(action)
//     apple: React.PropTypes.object.isRequired     // 单个苹果的数据
// };

export default AppleItem;