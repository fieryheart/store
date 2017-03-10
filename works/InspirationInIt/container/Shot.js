import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';


import Icon from './Icon';
import CropImage from 'react-native-cropimage';


class Shot extends Component {

	constructor(props) {
		  super(props);
		  this.state = {
			imageURL: this.props.shotInfo.images.normal,
			viewsCount : this.props.shotInfo.views_count,
			commentsCount: this.props.shotInfo.comments_count,
			likesCount: this.props.shotInfo.likes_count,
		  };

		this._showImage = this._showImage.bind(this);
		  
	}

	_showImage() {

		let {actions}  = this.props;
		
		actions.showImage(this.state.imageURL);
		
	}

	_showDescription() {

		console.error('Description');
	}

	render(){

		let {actions} = this.props;

		return (
			<View style={ [styles.row , styles.shotWrap] }>
				<View style={ [styles.col , styles.flexOne] }>
					<TouchableOpacity onPress={this._showImage} style={styles.flexOne}>
						<Image source={{uri: this.state.imageURL}}  style={ styles.imgSize }/>
					</TouchableOpacity>
					<View  style={ [styles.flexOne, styles.row, styles.icons] }>
						<Icon 
							source={require('../app/images/icon-views.png')}
							cropImage={{
								crop:{
									top: 3,
									left: 0,
									width: 20,
									height: 23
								},
								width: 20,
								height: 23
							}}
							count={this.state.viewsCount}
						/>
						<Icon 
							source={require('../app/images/icon-comments.png')}
							cropImage={{
								crop:{
									top: -1,
									left: 0,
									width: 17,
									height: 17
								},
								width: 17,
								height: 85
							}}
							count={this.state.commentsCount}
						/>
						<Icon 
							source={require('../app/images/icon-hearts.png')}
							cropImage={{
								crop:{
									top: 0,
									left: 0,
									width: 16,
									height: 22
								},
								width: 16,
								height: 64
							}}
							count={this.state.likesCount}
						/>
					</View>								
				</View>
				<View style={ styles.segment }></View>	
				<View  style={styles.description}>
					<TouchableOpacity  onPress={this._showDescription} style={styles.flexOne}>
						<Text>Logo Description</Text>
					</TouchableOpacity>	
				</View>
			</View>
			
		);

	}

}

const styles = StyleSheet.create({
	imgSize: {
		flex: 1,
		height: 150,
		borderRadius: 10
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'

	},
	shotWrap: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 9,
		marginLeft: 9,
		marginRight: 10,
		marginTop: 9,
		borderRadius: 10,
		backgroundColor: '#FFFFFF'
	},
	col: {
		flexDirection: 'column'
	},
	description: {
		flex: 1,
		marginLeft:10,
		paddingTop: 10,
		paddingLeft: 10
	},
	flexOne: {
		flex: 1
	},
	iconRow: {
		flexDirection: 'row',
		marginTop: 5
	},
	segment: {
		width:2,
		height:130,
		backgroundColor: '#eeeeee',
		marginLeft: 10,
		marginTop: 10
	},
	icons: {
		marginTop: 5,
		
		paddingLeft: 5,
		paddingRight: 5
	}

});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(Shot)