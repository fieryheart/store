import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import AppleItem from './AppleItem';
import actions from '../actions/appleActions';

import '../styles/appleBasket.scss';

class AppleBasket extends React.Component {

	getAppleItem(apples) {
		let data = [];
		let {dispatch} = this.props;
		apples.forEach(apple => {
			if(!apple.isEaten) {
				data.push( <AppleItem apple={apple} actions={ {eatApple: (id) => dispatch( actions.eatApple(id) ) } } key={apple.id} /> )
			}
		});

		return data;
	}

	render(){

		let { state , dispatch } = this.props;

		

		let stats = {
			appleNow: {
				quantity: 0,
				weight: 0
			},
			appleEaten: {
				quantity: 0,
				weight: 0
			}
		};

		state.apples.map(apple => {
			let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
			stats[selector].quantity++;
			stats[selector].weight += apple.weight;
		});


		return (
			<div className="appleBasket">
				<div className="title">苹果篮子</div>

				<div className="stats">
					<div className="section">
						<div className="head">当前</div>
						<div className="content">{stats.appleNow.quantity}个苹果，{stats.appleNow.weight}克</div>
					</div>
					<div className="section">
						<div className="head">已吃掉</div>
						<div className="content">{stats.appleEaten.quantity}个苹果，{stats.appleEaten.weight}克</div>
					</div>
				</div>

				<div className="appleList">
					{ this.getAppleItem(state.apples) }
				</div>

				<div className="btn-div">
					<button onClick={ () => dispatch( actions.pickApple() ) }>摘苹果</button>
				</div>
			</div>
		);
	}
}



const select = state => ({
	state:state
})

export default connect(select)(AppleBasket);

// const select = state => ({
// 	state: state.appleBasket
// });


// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(actions, dispatch)
// });

// export default connect(select, mapDispatchToProps)(AppleBasket);