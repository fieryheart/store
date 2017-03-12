import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class Header extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (

			<View style={styles.header}>
				<Image source={require('../app/images/logo.png')} style={styles.logo}></Image>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	header: {
		
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10

	},
	logo: {
		width:width,
		height: 170,
		resizeMode: "stretch"
	}
})