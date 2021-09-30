import React from 'react'
import {Text, SafeAreaView, View, Button, Pressable} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Announce ({ navigation }) {
     return(
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <View style={styles.headerContainer}>
                <MaterialIcons name={"arrow-back-ios"} 
                    size={35} 
                    color={'balck'}
                    style={{marginLeft:30}}
                    onPress={() => navigation.goBack()}
               />
                <View style={styles.headerTextContainer }>
                    <Text style={styles.headerText }>공지사항</Text>
                </View>                                   
            </View>      
        </SafeAreaView>
     );
};

export default Announce;