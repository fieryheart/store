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
// import Utils from './Utils';

class Description extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{this.props.description}</Text>
			</View>
		);
	}

}


const styles = StyleSheet.create({

	container: {

	},

	text: {
		
	}

});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(Description)