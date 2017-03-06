import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Shot extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
		imageURL: this.props.shotInfo.images.normal,
	  };
	}

	render(){
		<View>
			<Image src={require(imageURL)} />
		</View>
	}

}

const style = StyleSheet.create({

});