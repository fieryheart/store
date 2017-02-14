import React from 'react';
import { connect } from 'react-redux';

import AppleItem from '../component/AppleItem';

class AppleBasket extends React.Component {

	render(){

		let { state } = this.props;

		let mockState = {
			isPicking : false,
			newAppleId : 3,
			apples : [
				{
					id: 1,
					weight: 235,
					isEaten: true
				},
				{
					id: 2,
					weight: 256,
					isEaten: false
				}
			]
		};

		state = mockState;

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
			let selector = apple.isEacten ? 'appleEaten' : 'appleNow';
			stats[selector].quantity++;
			stats[selector].weight += apple.weight;
		})

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
					{ state.apples.map(apple => <AppleItem state={apple} />) }
				</div>

				<div className="btn-div">
					<button>摘苹果</button>
				</div>
			</div>
		);
	}
}

function select(state) {
	return {
		state: state.appleBusket
	}
}

export default connect(select)(AppleBusket);