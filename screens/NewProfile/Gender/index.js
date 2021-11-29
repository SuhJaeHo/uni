import React, {Component} from 'react';
import {SafeAreaView, View, Text, ImageBackground, Pressable, Dimensions, Image, TextInput, Alert, Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SERVER_URL } from '@env';

import styles from './styles';

export default class Gender extends Component {
    constructor(props) {
        super(props);
        this.state = {
           id: '',
           gender: '',     
           manColor: '#fff', 
           womanColor: '#fff',
           nextColor: '#fff',             
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

    check_Gender = (gender) => {
        if(gender === '남성') {
            this.state.manColor = '#fb009e';
            this.state.womanColor = '#fff';
        }else {
            this.state.womanColor = '#fb009e';
            this.state.manColor = '#fff';
        }

        this.state.nextColor = '#49ffbd';
    }

    connect = async () => {
        const URL = `${SERVER_URL}/setGender`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                gender: this.state.gender,
            })
        })    
    }

    render() {
        return (       
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require("../../../assets/imgs/2r.png")} resizeMode="cover" 
                    style={{ width: "100%", height: '100%' }}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.announceContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={styles.announceTitle}>
                                    성별
                                </Text>
                                <Text style={styles.announce}>
                                    을 
                                </Text>
                            </View>
                                <Text style={styles.announce}>
                                    알려주세요! 
                                </Text>                    
                                <Text style={styles.announceSpecific}>
                                    성별은 변경이 불가하니 신중하게 골라주세요!
                                </Text>
                        </View>
                        <View style={styles.selectboxContainer}>
                            <Pressable
                                style={{                                    
                                    width: Dimensions.get('window').width * 0.4,
                                    height: Dimensions.get('window').width * 0.4,
                                    backgroundColor: this.state.manColor,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 10,
                                    marginHorizontal: 10,                                                               
                                    shadowOpacity: 0.5,
                                    shadowRadius: 5,
                                    shadowColor: 'grey',
                                    shadowOffset: { height: 2, width: 2 },
                                    borderRadius: 20,           
                                    elevation: 5,                                                             
                                }}
                                onPress={() => {this.setState({gender: '남성'}); this.check_Gender('남성');}}
                            >                                                    
                                <Text style={styles.btnFonts}>남성</Text>
                            </Pressable>                                            
                            <Pressable
                                style={{
                                    width: Dimensions.get('window').width * 0.4,
                                    height: Dimensions.get('window').width * 0.4,
                                    backgroundColor: this.state.womanColor,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 10,
                                    marginHorizontal: 10,                            
                                    shadowOpacity: 0.75,
                                    shadowRadius: 5,
                                    shadowColor: 'grey',
                                    shadowOffset: { height: 2, width: 2 },
                                    borderRadius: 25,
                                    elevation: 5,  
                                }}
                                onPress={() => {this.setState({gender: '여성'}); this.check_Gender('여성');}}
                            >                                        
                                <Text style={styles.btnFonts}>여성</Text>
                            </Pressable>
                        </View>                                        
                        <Pressable
                            style={{
                                width: Dimensions.get('window').width * 0.7,
                                height: 50,
                                backgroundColor: this.state.nextColor,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection:'row',
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                shadowColor: 'grey',
                                shadowOffset: { height: 2, width: 2 },
                                elevation: 5,  
                                borderRadius: 25,
                                position: 'absolute',
                                bottom: 10,                                                                                 
                            }}
                            onPress={() => 
                                {
                                    this.state.gender === '' 
                                    ? Alert.alert('성별을 설정해주세요')
                                    : (this.connect(), this.props.navigation.navigate('Birth'));                                    
                                }
                            }
                        >
                            <Text style={{fontSize:20}}>NEXT </Text>
                            <MaterialIcons 
                                name={"navigate-next"}
                                style={styles.btnFonts}
                            />
                        </Pressable>          
                    </View>  
                </ImageBackground>                   
            </View>
        )
    }
}