import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Shot from './Shot.js';


// 添加redux来改变state重新更新
class ShotsApp extends Component {

    handleShotList( shots ) {
        let data = [];

        if(shots) {
            shots.forEach( (shot) => {
                    if(shot){
                        data.push(<Shot shotInfo={shot}/>)
                    }
            })
        }

        return data;
    }

    render() {
        actions.getShots();
        const {state , actions} = this.props;
        return (
            <View>

                { this.handleShotList(stata.shots) }
                <Text>shots</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => {
    state = state.shotsReducer; 
}

export default connect(mapStateToProps, mapDispatchToProps)(ShotsApp)