import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
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

		return (
			<Image source={{uri: this.state.imageURL}} />
		);

	}

}

const style = StyleSheet.create({

});