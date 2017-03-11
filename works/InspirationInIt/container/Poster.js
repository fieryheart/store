import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	Animated
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';


const {width, height} = Dimensions.get('window');

class Poster extends Component {
	
	constructor(props) {
	  	super(props);
	
	  	this.state = {
			imgWidth: new Animated.Value(0),
			imgHeight: new Animated.Value(0),
			imgMarginTop: new Animated.Value(0)
	  	};

		this.onDelete = this.onDelete.bind(this);
	}

	onDelete(){
		
		let {actions} = this.props;
		actions.notShowImage();

	}
	
	componentDidMount() {
		this.state.imgWidth.setValue(500);
		this.state.imgHeight.setValue(1);
		this.state.imgMarginTop.setValue(0);

		Animated.parallel([
			Animated.spring(
				this.state.imgHeight,
				{
					toValue: 300,
					frinction: 3
				}
			),
			Animated.spring(
				this.state.imgMarginTop,
				{
					toValue: -100,
					frinction: 3
				}
			)
		]).start();

	}


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.curtain}></View>
				<TouchableHighlight 
					onPress={this.onDelete}
					style={styles.button}
					underlayColor="#ffffff"
				>
					<Text style={styles.buttonText}>X</Text>
				</TouchableHighlight>
				<View style={styles.flexOne}>

					<Animated.Image source={{
							uri: this.props.source
						}} 
						style={{width: this.state.imgWidth, height: this.state.imgHeight, borderRadius: 10, marginTop: this.state.marginTop}}
					/>
				</View>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container:{
		position: 'absolute',
		top: 0,
		bottom:0,
		left: 0,
		right: 0
	},
	curtain: {
		position: 'absolute',
		top: 0,
		bottom:0,
		left: 0,
		right: 0,
		backgroundColor: '#000000',
		opacity: 0.8
	},
	button: {
		width: 30,
		height: 30,
		borderRadius: 15,
		// borderWidth: 1,
		// borderColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		position: 'absolute',
		right: 10,
		top: 8
	},
	buttonText: {
		color: '#dddddd',
		fontSize: 20		
	},
	flexOne: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(Poster)