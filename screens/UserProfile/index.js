import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableHighlight, TextInput, Pressable, FlatList, BackHandler, Alert} from 'react-native';

import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import ActionSheet from 'react-native-actionsheet';

import { LOCAL_URL } from '@env';
import { TouchableOpacity } from 'react-native';

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
                    '부적절한 메세지',
                    '부적절한 프로필 사진',
                    '기타',                    
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
            <View style={{flexWrap: 'wrap', }}>
                <View style={styles.hobbyContainer}>
                    <Text style={styles.hobbyItem}>{item}</Text>
                </View>
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
            <View style={{}}>                
                <Image                     
                    source={{ uri: this.state.profile }}
                    style={{ width: Dimensions.get('window').width * 1, height: Dimensions.get('window').height * 0.4 }}                                
                />
                <View style={styles.userContainer}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.userName}>{this.state.userName} </Text>   
                        <Text style={styles.userAge}> {this.state.age}</Text>    
                    </View>                                        
                    <Text style={styles.userGender}>{this.state.gender}</Text>                                         
                    <FlatList 
                        contentContainerStyle={styles.hobbyList}
                        data={this.state.hobby}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}           
                        showsHorizontalScrollIndicator={false}             
                    />
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:30}}>
                        <TouchableOpacity
                            onPress={()=>alert('서비스 준비중')}
                            style={styles.userBtn}
                        >
                            <Text style={{fontSize:20}}>{this.state.userName}님 친구추가</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>alert('서비스 준비중')}
                            style={styles.userBtn}
                        >
                            <Text style={{fontSize:20}}>{this.state.userName}님에게 메세지 보내기</Text>
                        </TouchableOpacity>
                        <TouchableHighlight
                            onPress={this.showActionSheet}
                            style={styles.userRptBtn}
                        >
                            <Text style={{fontSize:20, color:'red'}}>{this.state.userName}님 신고</Text>
                        </TouchableHighlight>
                    </View>                    
                    <ActionSheet 
                        ref={this.bs}
                        title={'신고 사유'}
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
        marginLeft: Dimensions.get('window').width * 0.02,    
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5
    },
    userAge: {
        fontSize: 30,
        marginBottom: 5
    },
    userGender:{
        fontSize: 25,
        marginBottom: 5
    },
    hobbyList: {
        flexDirection: 'row',                                
    },
    hobbyItem: {
        fontSize: 17,                
    },
    hobbyContainer:{
        borderWidth: 1,
        borderColor:'#fb009e',
        paddingVertical: 7,
        paddingHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 20,
        height: 50,
        marginTop: 10,        
    },
    userBtn:{
        width: 250,         
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    userRptBtn:{
        width: 250,         
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 5,
        borderRadius: 20
    }
}); 