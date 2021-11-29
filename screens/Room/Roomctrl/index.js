import React, { useEffect, useState } from 'react'
import {Text, SafeAreaView, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';

import UserList from '../UserList';
import RequestList from '../RequestList';
import Roominfo from '../Roominfo';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
//const Tab = createMaterialTopTabNavigator();

function Roomctrl (props) {
    const [id, setId] = useState('');
    const params = props.route.params;    

    useEffect(() => {   
        getId();
    }, []);

    const getId = async() => {
        var loggedId = await AsyncStorage.getItem('id');
        setId(loggedId);        
    }
      
    if(params.sendd.hostUser.indexOf(id) > -1) {
        return(        
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {                      
                        if (route.name === 'Roominfo') {
                            return (
                                <AntDesign name="user" size={20} color={color} />
                            );
                        }
                        if (route.name === 'RequestList') {
                            return (   
                                <AntDesign
                                    name="infocirlceo"
                                    size={20}
                                    color={color}
                                />
                            );
                        }             
                    },
                })}            
                initialRouteName="Chatting"
                tabBarOptions={{
                    activeTintColor: '#fb009e',
                    inactiveTintColor: 'gray',
                    labelStyle: { fontSize: 16 , fontWeight: 'bold' },
                }}
                tabBarPosition={'bottom'}                        
            >                
                <Tab.Screen name="Roominfo" component={Roominfo} initialParams={params}/>
                <Tab.Screen name="RequestList" component={RequestList} initialParams={params}/>                        
            </Tab.Navigator>                
        );    
    }else {
        return(        
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => {                      
                        if (route.name === 'Roominfo') {
                            return (
                                <AntDesign name="user" size={20} color={color} />
                            );
                        }
                        if (route.name === 'UserList') {
                            return (   
                                <AntDesign
                                    name="infocirlceo"
                                    size={20}
                                    color={color}
                                />
                            );
                        }             
                    },
                })}            
                initialRouteName="Chatting"
                tabBarOptions={{
                    activeTintColor: '#fb009e',
                    inactiveTintColor: 'gray',
                    labelStyle: { fontSize: 16 , fontWeight: 'bold' },
                }}
                tabBarPosition={'bottom'}                        
            >                
                <Tab.Screen name="Roominfo" component={Roominfo} initialParams={params}/>
                <Tab.Screen name="UserList" component={UserList} initialParams={params}/>                        
            </Tab.Navigator>                
        );
    }
};

export default Roomctrl;