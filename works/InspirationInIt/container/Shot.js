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
					<Image source={require('../app/images/icon-views.png')}  style={styles.iconViews}>
						
					</Image>
					<Text style={styles.count}>{this.state.viewsCount}</Text>
					<Image source={require('../app/images/icon-comments.png')} style={styles.iconComments}>
						
					</Image>
					<Text style={styles.count}>{this.state.commentsCount}</Text>
					<Image source={require('../app/images/icon-likes.png')} style={styles.iconLikes}>
						
					</Image>
					<Text style={styles.count}>{this.state.likesCount}</Text>
				</View>
			</View>
			
		);

	}

}

const styles = StyleSheet.create({
	imgSize: {
		flex: 1,
		height: 300,
		margin: 20,
		borderRadius: 10
	},
	row: {
		flexDirection: 'row',
	},
	col: {
		flexDirection: 'column',
	},
	iconViews: {
		width: 20,
		height:15,
		marginLeft:10,
	},
	iconComments:{
		width: 18,
		height: 20,
		marginLeft:10,
	},
	iconLikes: {
		width: 18,
		height:15,
		marginLeft:10,
	},
	count: {
		marginLeft: 10,
	}
});