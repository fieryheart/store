import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
	Animated,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';
import Utils from './Utils';

class Description extends Component {
	constructor(props) {
	  super(props);
		
		if(this.props.description){
			this.state = {
				description: Utils.destructionString(this.props.description)
			};
		}

		this.onDelete = this.onDelete.bind(this);

	}


	onDelete(){
		
		let {actions} = this.props;
		actions.notShowDescription();

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
			   	<View style={styles.wrap}>
			   		<Text style={styles.text}>{this.state.description}</Text>
			   	</View>
			</View>
		);
	}

}


const styles = StyleSheet.create({

	container: {
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
	text: {
		marginTop: 80,
		marginLeft: 20,
		marginRight: 20,
		fontSize: 24,
		opacity:0.8
	},
	button: {
		width: 30,
		height: 30,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		position: 'absolute',
		right: 10,
		top: 8
	},
	buttonText: {
		color: '#dddddd',
		fontSize: 24		
	},
	wrap: {
		position: 'absolute',
		top: 50,
		bottom: 50,
		left: 30,
		right: 30,
		alignItems: 'center',
		backgroundColor: '#ffffff'
	}

});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(Description)