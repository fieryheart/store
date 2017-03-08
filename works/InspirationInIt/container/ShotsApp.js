import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../Action';

import Shot from './Shot';


// 添加redux来改变state重新更新
class ShotsApp extends Component {

    componentDidMount() {
        let {actions} = this.props;
        actions.fetchShots();
    }

    handleShotList(shots) {

        let data = [];
        if(shots) {
            // console.error(typeof shots);
            shots.forEach( (shot) => {
                    if(shot){
                        data.push(<Shot shotInfo={shot} key={shot.id}/>)
                    }
            })
        }
        return data
    }

    render() {
        
        let {state} = this.props;


        return (
            <View>
                    { this.handleShotList(state.shots) }
                    <Text>Shots</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
    state : state.shotsReducer
});

export default connect(mapStateToProps , mapDispatchToProps)(ShotsApp)