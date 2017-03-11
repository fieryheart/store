import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class Header extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (

			<View>
				<Image source={require('../app/images/')}></Image>
			</View>

		);
	}
}