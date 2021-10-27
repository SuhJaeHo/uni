import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableHighlight, TextInput, Pressable, FlatList, BackHandler, Alert} from 'react-native';

import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import ActionSheet from 'react-native-actionsheet';

import { LOCAL_URL } from '@env';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            profile: null, 
            age: 0,      
            hobby: [],  
            gender: '', 
            visible: false,

            reason: [
                    'message',
                    'profile image',
                    'appoint',                    
                    'Cancel',
            ]
        }
    }

    componentDidMount = () => {
        this.connect();        
    }

    connect = async() => {
        var uid = this.props.route.params.uid;     

        this.setState({
            userName: this.props.route.params.name,
            profile: this.props.route.params.image.uri,
        })
        
        fetch(`${LOCAL_URL}/userProfile/?id=` + uid)    
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                age: responseData.age,
                gender: responseData.gender,
                hobby: responseData.hobby.split(','),
            })                          
        })                                         
    }    

    renderItem = ({item}) => {
        return (
            <View>
                <Text style={styles.hobbyItem}>{item}</Text>
            </View>
        )
    }

    bs = React.createRef();    
    showActionSheet = () => {        
        this.bs.current.show();
    };

    report = async(reason) => {
        console.log(reason);
        var uid = this.props.route.params.uid;  

        const URL = `${LOCAL_URL}/reportUser`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: uid,
                reason: reason,
            })
        })        
    }

    render() {
        return (
            <View>                
                <Image                     
                    source={{ uri: this.state.profile }}
                    style={{ width: Dimensions.get('window').width * 1, height: Dimensions.get('window').height * 0.4 }}                                
                />
                <View style={styles.userContainer}>
                    <Text style={styles.userInfo} numberOfLines={2}>{this.state.userName},  {this.state.age}</Text>   
                    <Text>{this.state.gender}</Text>                         
                    <Text>관심사</Text>
                    <FlatList 
                        contentContainerStyle={styles.hobbyList}
                        data={this.state.hobby}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableHighlight
                       onPress={this.showActionSheet}
                    >
                        <Text>{this.state.userName}님 신고</Text>
                    </TouchableHighlight>
                    <ActionSheet 
                        ref={this.bs}
                        title={'Select Reason'}
                        options={this.state.reason}
                        cancelButtonIndex={3} 
                        onPress={(index) => this.report(this.state.reason[index])}  
                    />
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userContainer: {        
        padding: Dimensions.get('window').width * 0.05,        
    },
    userInfo: {
        fontSize: 30,
    },
    hobbyList: {
        flexDirection: 'row',                                
    },
    hobbyItem: {
        marginRight: 20,                
    }
  });