import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';

import Comment from './Comment';

class Comments extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {};
	
		this.onDelete = this.onDelete.bind(this);
	}
	
	onDelete(){
		
		let {actions} = this.props;
		actions.notShowComments();

	}


	showComments( comments ) {
	    let data = [];

	    if(comments) {
	       comments.forEach(function(comment) {
	            data.push( <Comment source={comment.user.avatar_url} comment={comment.body} time={comment.created_at} username={comment.user.username} key={comment.id}/> )
	        })
	    }else{
	        return (<Text>No Comments</Text>);
	    }

	    return data;
	}

	render() {

		let {comments, actions} = this.props;

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
				<ScrollView style={styles.comments}>
					{ this.showComments(comments)}
					<TouchableHighlight onPress={actions.fetchComments} underlayColor="#000000">
					    <Text style={styles.getMore}>Get More...</Text>
					</TouchableHighlight>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
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
	comments: {
		backgroundColor: '#ffffff',
		marginTop: 50,
		marginBottom: 50,
		marginLeft: 50,
		marginRight: 50,
		paddingTop: 30,
		paddingLeft: 20,
		paddingRight: 20
	},
	getMore: {
	    flex: 1,
	    color: "#000000",
	    fontSize: 14,
	    textAlign: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#aaaaaa',
	    marginLeft: 10,
	    marginRight: 10,
	    borderRadius: 5,
	    paddingTop: 8,
	    paddingBottom: 8
	}
});


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(Comments)