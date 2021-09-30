import React from 'react'
import {Text, SafeAreaView, View, Button} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

function Cs ({ navigation }) {
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
                    <Text style={styles.headerText }>고객지원</Text>
                </View>                             
            </View>
            <Text>
                Email
            </Text>     
            <Text>
                unicorporated@gmail.com
            </Text>
        </SafeAreaView>
     );
};

export default Cs;