import React, {Component} from 'react';
import {View, Text, ImageBackground, Pressable, Dimensions, Image, Alert, SafeAreaView, TextInput} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export default class Nickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nickname: '',
            nextColor: '#FFF',
        }
    }

    componentDidMount = () => {
        this.getId();
    }

    getId = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            if(id !== null) {
                this.setState({ 
                    id: id,
                })
            }
        } catch(e) {
            console.log(e);
        }
    }

    onChangeText = async(text) => { 
        if(text.length !== 0) {
            this.setState({nextColor: '#fb009e'})    
        }else {
            this.setState({nextColor: '#FFF'})
        }
        
        this.setState({nickname: text})
    }

    connect = async () => {
        console.log('들어옴');
        if(this.state.nickname === '') {
            Alert.alert('닉네임을 설정해주세요');
        }else {
            try {
                await AsyncStorage.setItem('nickname', this.state.nickname)    
            } catch (e) {
                console.log(e);
            }

            const URL = "http://localhost:3000/setNickname";
            //const URL = "http://10.0.2.2:3000/setNickname";
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.id,
                    nickname: this.state.nickname,
                })
            }) 
            .then(() => this.props.navigation.navigate('Gender'))  
        } 
    }

    render() {
        return (       
            <View>
                <ImageBackground
                    source={require("../../../assets/imgs/2.png")} resizeMode="cover" 
                    style={{width:"100%", height:'110%', }}
                >
                            
                <View style={styles.contentContainer}>
                <View style={styles.announceContainer}>
                    <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                    <Text style={styles.announceTitle}>
                            닉네임
                        </Text>
                        <Text style={styles.announce}>
                             을 
                        </Text>
                        </View>
                        <Text style={styles.announce}>
                             알려주세요! 
                        </Text>
                    
                        <Text style={styles.announceSpecific}>
                        닉네임은 변경이 불가하니 신중하게 골라주세요!
                        </Text>
                    </View>
                    <TextInput
                        style={styles.nicknameInput}
                        outlineColor="#96FFD9"
                        selectionColor="#49ffbd"
                        textAlign={'center'}
                        placeholder="Tell me your nickname"
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.nickname}
                    />
                    <View
                    style={{
                        position:'absolute',
                        bottom:10
                    }}>
                        <Pressable
                            style={{
                                width: Dimensions.get('window').width * 0.7,
                                height: 50,
                                backgroundColor: this.state.nextColor,
                                borderRadius:25,
                                
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection:'row',
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                shadowColor: 'grey',
                                shadowOffset: { height: 2, width: 2 },
                                
                               
                            }}
                            onPress={() => this.connect()}
                        >
                            <Text style={styles.btnFonts}>NEXT </Text>
                            <MaterialIcons 
                            name={"navigate-next"}
                            style={styles.btnFonts}
                            />
                        </Pressable>
                    </View>
                    
                </View>      
                </ImageBackground>              
            </View>
        )
    }
}
