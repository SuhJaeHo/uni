import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, Pressable, BackHandler, Switch, Dimensions, StyleSheet, FlatList} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypov from 'react-native-vector-icons/Entypo';

import { LOCAL_URL } from '@env';

export default class notifyContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }

    componentDidMount = async() => {        
        this.setState({
            content: this.props.route.params.data,
        })
        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);  
        });     
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.navigate('Notify');
        return true;
    }    

    render () {
        return(            
            <View style={{width: Dimensions.get('screen').width * 1, height: Dimensions.get('screen').height * 1, backgroundColor: '#fff'}}> 
                <View style={{paddingHorizontal: 20}}>
                    <Text>{this.state.content}</Text>                     
                </View>
            </View>
        );
    }    
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 20,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',        
    },
});