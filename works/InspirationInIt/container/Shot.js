import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default class Shot extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
		imageURL: this.props.shotInfo.images.normal,
		viewsCount : this.props.shotInfo.views_count,
		commentsCount: this.props.shotInfo.comments_count,
		likesCount: this.props.shotInfo.likes_count
	  };


	}

	_onPressButton() {
		styles.imgSize.margin = 40
	}

	render(){
		return (
			<View style={ styles.col }>
				<Image source={{uri: this.state.imageURL}}  style={ styles.imgSize }/>
				<View style={ styles.row }>
					<Image source={require('../app/images/icon-views.png')}  style={styles.iconViews}></Image>
					<Text style={styles.count}>{this.state.viewsCount}</Text>
					<Image source={require('../app/images/icon-comments.png')} style={styles.iconComments}></Image>
					<Text style={ {marginLeft: 30, fontSize: 12} }>{this.state.commentsCount}</Text>
					<Image source={require('../app/images/icon-hearts.png')} style={styles.iconLikes}></Image>
					<Text style={ {marginLeft: 40, fontSize: 12} }>{this.state.likesCount}</Text>
				</View>
			</View>
			
		);

	}

}

const styles = StyleSheet.create({
	imgSize: {
		flex: 1,
		height: 300,
		borderRadius: 10
	},
	row: {
		flexDirection: 'row',
		marginTop:10
	},
	col: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		flexDirection: 'column',
		backgroundColor: '#FFFFFF'
	},
	iconViews: {
		width: 21,
		height:16,
		marginLeft:10,
	},
	iconComments:{
		width: 18,
		height: 90,
		position: 'absolute',
		zIndex: -1,
		left: 70,
		translateY: -24
	},
	iconLikes: {
		width: 18,
		height: 68,
		position: 'absolute',
		left: 120,
		zIndex: -1
	},
	count: {
		marginLeft: 5,
		fontSize: 12
	}
});