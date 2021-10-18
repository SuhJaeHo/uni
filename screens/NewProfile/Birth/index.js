import React, {Component} from 'react';
import {SafeAreaView, View, Text, Pressable, Dimensions, ImageBackground, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DatePicker from 'react-native-date-picker';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SERVER_URL } from '@env';

import styles from './styles';

export default class Birth extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           id: '',    
           birth: '',  
           age: 0,
           
           date: '',
           check: 0,    
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

    changeDate = (date) => {   
        this.state.date = date; 
        this.state.check = 1;

        this.state.birth = date;
        console.log(date);

        var currentYear = new Date().getFullYear();
        var birthYear = date.getFullYear();
        this.state.age = currentYear - birthYear + 1;
        
        this.setState({
            nextColor: '#49ffbd',
        })
    }   

    connect = async () => {
        const URL = `${SERVER_URL}/setBirth`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                birth: this.state.birth,
                age: this.state.age,
            })
        })    
    }

    render() {
        if(this.state.check === 0) {
            this.state.date = new Date();
        }
        return (       
            <View style={{backgroundColor:'#fff'}}>
                <ImageBackground
                    source={require("../../../assets/imgs/3r.png")} resizeMode="cover" 
                    style={{width:"100%", height:'100%', }}
                >   
                    <View style={styles.contentContainer}>
                        <View style={styles.announceContainer}>
                            <View style={{ flexDirection:'row', alignItems:'flex-end'}}>
                                <Text style={styles.announceTitle}>
                                    생일
                                </Text>
                                <Text style={styles.announce}>
                                    을 
                                </Text>
                            </View>
                            <Text style={styles.announce}>
                                알려주세요! 
                            </Text>                    
                            <Text style={styles.announceSpecific}>
                                생일은 변경이 불가하니 신중하게 골라주세요!
                            </Text>
                        </View>                    
                        <DatePicker
                            mode='date'
                            date={this.state.date}                                       
                            minuteInterval={10}
                            onDateChange={this.changeDate}
                            androidVariant="iosClone"
                            locale="ko"
                            is24hourSource="locale"
                            style={{ width: 300, height: 300, position: 'absolute', top: 230, marginTop: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                            textColor="#000"
                        />                                                    
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
                                borderRadius: 25,
                                position: 'absolute',
                                bottom: 10
                            }}
                            onPress={() => 
                                {
                                    this.state.birth === ''
                                    ? Alert.alert('생년월일을 설정해주세요')
                                    : (this.connect(), this.props.navigation.navigate('Interest'))
                                }
                            }
                        >
                            <Text style={styles.btnFonts}>NEXT </Text>
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