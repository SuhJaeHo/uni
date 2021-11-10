import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert, BackHandler, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import 'moment/locale/ko';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LogBox } from "react-native";

import styles from './styles';

export default class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTime: '',
            showTime: '',
            isChange: false,
        }
    }

    componentDidMount = () => {
        LogBox.ignoreAllLogs(true); 
        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);  
        });   
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.navigate('Hosting');
        return true;
    }

    datePicker = () => {
        var currentTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + (9 * 60 * 60 * 1000));
        
        if(!this.state.isChange) {
            this.state.dateTime = currentTime;
            this.state.showTime = Moment(currentTime).format('MM/DD(dd)  HH:mm');
        }

        return (
            <View>        
                <View style={styles.timeInfoContainer}>
                    <Text style={styles.timeInfoText}>{this.state.showTime}</Text>                                        
                </View>
                <DatePicker
                    mode='datetime'
                    date={this.state.dateTime}
                    onDateChange={this.onChangeTime}
                    minimumDate={currentTime}
                    minuteInterval={10}
                    locale="ko"
                    is24hourSource="locale"
                    androidVariant="nativeAndroid"                    
                />
            </View>
        )
    }

    onChangeTime = (selectedTime) => {
        const currentTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + (9 * 60 * 60 * 1000));                     

        if(currentTime > selectedTime) {
            //Alert 대신 Fade out으로 바꿀 예정
            Alert.alert('X');
        }else {
            this.setState({       
                dateTime: selectedTime,         
                showTime: Moment(selectedTime).format('MM/DD(dd)  HH:mm'),
                isChange: true,                
            })     
            this.datePicker();                               
        }
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity>
                        <Ionicons                        
                            name={"ios-chevron-back"}
                            size={30}
                            color={'black'}
                            style={{marginRight: 22, marginLeft: 10}}
                            onPress={() => this.props.navigation.push('Hosting', {time: JSON.stringify(this.state.dateTime), timeInfo: this.state.showTime, Info: 'time'})}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize: 18}}>약속시간</Text>
                </View>                
                <View style={styles.contentContainer}>                    
                    {this.datePicker()}                    
                </View>
                <Pressable
                    onPress={() => this.props.navigation.push('Hosting', {time: JSON.stringify(this.state.dateTime), timeInfo: this.state.showTime, Info: 'time'})}
                >
                    <TouchableOpacity style={styles.setBtn}>
                        <Text style={{color:'#fff', fontSize:25, fontWeight:'bold'}}>
                            SET
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </View>
        )
    }
}