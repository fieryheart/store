import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';


const {width, height} = Dimensions.get('window');

class Poster extends Component {
	
	constructor(props) {
	  	super(props);
	
	  	this.state = {};
		this.onDelete = this.onDelete.bind(this);
	}

	onDelete(){
		
		let {actions} = this.props;
		actions.notShowImage();

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrap}></View>
				<TouchableHighlight 
					onPress={this.onDelete}
					style={styles.button}
					underlayColor="#ffffff"
				>
					<Text style={styles.buttonText}>X</Text>
				</TouchableHighlight>
				<View style={styles.flexOne}>

					<Image source={{
						uri: this.props.source
						}} 
						style={[styles.image]}
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
	wrap: {
		position: 'absolute',
		top: 0,
		bottom:0,
		left: 0,
		right: 0,
		backgroundColor: '#aaaaaa',
		opacity: 0.5
	},
	image: {
		width: 500,
		height: 300,
		borderRadius: 10,
		marginTop: -100
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