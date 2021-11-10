import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import IconBadge from 'react-native-icon-badge';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

export default class MainButton extends Component { 
    render() {
        return (       
            <View style={styles.btnContainer}>
                <TouchableOpacity>
                    <Pressable
                        style={styles.Button}
                        onPress={() => this.props.navigate('Hosting')}
                    >
                        <Ionicons
                            color="#fff"
                            name='golf'
                            size={30}
                        />
                        <Text style={styles.Txt}>Make</Text>
                    </Pressable>
                </TouchableOpacity>
                <TouchableOpacity>        
                    <Pressable
                        style={styles.Button}
                        onPress={() => this.props.navigate('Chat')}
                    >
                        <Ionicons
                            color="#fff"
                            name='chatbubbles-sharp'
                            size={30}
                        />
                        <Text style={styles.Txt}>Chat</Text>
                    </Pressable>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Pressable
                        style={styles.Button}
                        onPress={() => this.props.navigate('Room')}
                    >
                        <Foundation
                            color="#fff"
                            name='results-demographics'
                            size={30}
                        />
                        <Text style={styles.Txt}>Room</Text>
                    </Pressable>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        width: Dimensions.get('screen').width - 40,
        marginHorizontal: 20,
        justifyContent:'center',
        position:'absolute',
        zIndex:100,
        flexDirection:'row',
        bottom: 30,
        padding:5,
        borderRadius:20,                    
    },
    Button: {
        width:70,
        height:70,
        backgroundColor:'#fb009e',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:26,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
    },
    Txt: {
        fontWeight:'900',
        color:'#fff',
        fontSize:15
    }
});