import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';

import CropImage from 'react-native-cropimage';


class IconHearts extends Component {

	constructor(props) {
	  	super(props);
	  
	  	this.state = {
	  	
	  	};
		
		this.handleClick = this.handleClick.bind(this);

	}

	handleClick() {

		let {actions , commentsURL}  = this.props;

		actions.fetchComments(commentsURL);

	}

	render() {

		let { count , cropImage , source } = this.props;
		return (
			<View style={{flexDirection: 'row',marginLeft: 8, flex: 1}}>
				<CropImage
					source={source}
					crop={{
						top: cropImage.crop.top,
						left: cropImage.crop.left,
						width: cropImage.crop.width,
						height: cropImage.crop.height
					}}
					width={ cropImage.width }
					height= { cropImage.height }
					onPress={ this.handleClick }
				/>
				<Text style={ [styles.count_fontSize , styles.count_margin] } onPress={ this.handleClick }>{count}</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	count_fontSize: {
		fontSize: 12
	},
	count_margin: {
		marginLeft: 5
	},
	icon_margin: {
		marginLeft: 8
	}
})


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(IconHearts)