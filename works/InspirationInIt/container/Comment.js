import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import Utils from './Utils';

export default class Comment extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {

		let comment = Utils.destructionString(this.props.comment);
		return (
			
			
			<View style={styles.comment}>
				<View style={styles.user}>
					<Image source={{
						uri: this.props.source
					}} style={styles.avatar}/>
					<Text>{this.props.username}</Text>
				</View>
				<View style={styles.information}>
					<Text style={styles.context}>{comment}</Text>
					<Text style={styles.time}>{this.props.time}</Text>
				</View>

			</View>

		);
	}
}


const styles = StyleSheet.create({
	comment: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee',
		paddingTop: 10,
		paddingBottom: 10
	},
	user: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	information: {
		flexDirection: 'column',
		borderLeftWidth: 1,
		borderLeftColor: '#eeeeee',
		marginLeft: 20,
		paddingLeft: 10
	},
	context: {
		fontSize: 16
	},
	time: {
		justifyContent: 'flex-end',
		fontSize: 12,
		marginTop: 50,
		color: '#aaaaaa'
	}
});