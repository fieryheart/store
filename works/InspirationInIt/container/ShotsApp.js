import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';
import Poster from './Poster';
import Shot from './Shot';
import Description from './Description';
import Comments from './Comments';
import Header from './Header';

// 添加redux来改变state重新更新
class ShotsApp extends Component {

    componentDidMount() {
        let {actions} = this.props;
        actions.fetchShots();
    }

    showShotList(shots) {
        let data = [];
        let {actions}  = this.props;
        if(shots) {
                shots.forEach( (shot) => {
                        if(shot){
                            data.push(<Shot shotInfo={shot} key={shot.id} />)
                        }
                })
        }


        return data;
    }


    showImg( state ) {
        let poster = [];
        if(state.showImage){
           poster.push( <Poster source={state.imageURL}  key={poster.length}/> );
       }else{
            poster.pop();
       }

       return poster;
    }

    showDescription( state ) {
        let description = [];

        if(state.showDescription){
            description.push( <Description description={state.description} key={description.length} /> );
        }else{
            description.pop();
        }

        return description;
    }


    showComments( state ) {
        let comments = [];

        if(state.showComments){
            comments.push( <Comments comments={state.comments} key={comments.length}/> );
        }else{
            comments.pop();
        }

        return comments;
    }


    render() {
        
        let {state} = this.props;

        return (
            <View style={styles.container}>
                
                <ScrollView>
                    <Header />
                    <View style={styles.shotsBoxSize}>
                         { this.showShotList(state.shots) }      
                    </View>
                </ScrollView>
                <View style={styles.posterContainer}>
                    { this.showImg(state) }
                </View>
                <View style={styles.descriptionContainer}>
                    { this.showDescription(state)}
                </View>
                <View style={styles.commentsContainer}>
                    { this.showComments(state)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#000000'
    },

    shotsBoxSize: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#000000'
    },
    posterContainer: {
        position: 'absolute',
        top: 0,
        bottom:0,
        left: 0,
        right: 0
    },
    descriptionContainer: {
        position: 'absolute',
        top: 0,
        bottom:0,
        left: 0,
        right: 0
    },
    commentsContainer: {
        position: 'absolute',
        top: 0,
        bottom:0,
        left: 0,
        right: 0
    }
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(ShotsApp)