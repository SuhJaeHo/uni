import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, Pressable, BackHandler, Switch, Dimensions, StyleSheet, FlatList} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypov from 'react-native-vector-icons/Entypo';

import { SERVER_URL } from '@env';


export default class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notify: [],
        }
    }

    componentDidMount = async() => {
        this.getNotify();
        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);  
        });     
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.navigate('DrawerNav');
        return true;
    }    

    getNotify = async() => {             
        const URL = `${SERVER_URL}/getNotify`;
        
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                notify: responseData,
            })
        })
    }

    render () {
        return(            
            <View style={{width: Dimensions.get('screen').width * 1, height: Dimensions.get('screen').height * 1, backgroundColor: '#fff'}}> 
                <FlatList 
                    data={this.state.notify}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.listContainer}>                                
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.push('notifyContent', {data: item.content})}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <View
                                            style={{marginRight: Dimensions.get('screen').width * 0.7}}
                                        >
                                            <Text style={{fontSize: 17}}>{item.title}</Text>
                                            <Text style={{fontSize: 12, color: 'gray'}}>{item.timeInfo}</Text>
                                        </View>                                    
                                        <Entypov                                         
                                            name={'chevron-right'}
                                            size={28}
                                            color={'#fb009e'}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item._id}
                />                     
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