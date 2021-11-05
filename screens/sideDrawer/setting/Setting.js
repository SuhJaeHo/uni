import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, Pressable, BackHandler} from 'react-native';
import LogoutBtn from '../../../Components/logOutBtn';
import DropUser from '../../../Components/DropUser';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

export default class Setting extends Component {
    componentDidMount = async() => {
        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);  
        });     
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.navigate('HomePage');
        return true;
    }

    render () {
        return(
            <View style={{}}>      
                <View style={styles.backIcon}>
                    <Pressable
                        onPress={() => this.props.navigation.navigate('HomePage')}
                        style={styles.backIcon}
                    >
                        <MaterialIcons name={"arrow-back-ios"} 
                            size={35} 
                            color={'#000'}
                            style={{marginLeft:30}}
                        />                                
                    </Pressable>
                </View>
                <View style={{}}>
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', }}>
                        <TouchableOpacity 
                            style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', paddingVertical:10}}
                            onPress={() => alert ('서비스 준비중')}
                        >
                            <Image
                                style={{width:80, height:80}}
                                source={require('../../../assets/imgs/invitation.png')}
                            />
                            <Text style={{marginTop:10, fontWeight:'bold', fontSize:18}}>
                                친구 초대하기
                            </Text>
                        </TouchableOpacity>                    
                    </View>
                    <View style={{marginTop:20, backgroundColor:'#fff'}}>
                        <Text style={styles.textBtn}>
                            이메일
                        </Text>
                        <Text style={styles.textBtn}>
                            전화번호
                        </Text>
                        <Text style={styles.textBtn}>
                            위치
                        </Text>                
                    </View>
                    <View style={{marginTop:20, backgroundColor:'#fff'}}>
                        <Text style={styles.textBtn}>
                            개인정보 취급방침
                        </Text>
                        <Text style={styles.textBtn}>
                            이용약관
                        </Text>
                        <Text style={styles.textBtn}>
                            라이선스
                        </Text>
                        <Text style={styles.textBtn}>
                            개인정보 설정
                        </Text>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:30}}>
                    <LogoutBtn/>
                    <DropUser/>
                </View>            
            </View>
        );
    }    
};

