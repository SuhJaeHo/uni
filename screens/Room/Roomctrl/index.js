import React from 'react'
import {Text, SafeAreaView, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';

import UserList from '../UserList';
import Roominfo from '../Roominfo';

const Tab = createBottomTabNavigator();
//const Tab = createMaterialTopTabNavigator();

function Roomctrl (props) {
    const params = props.route.params;
    
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
                activeTintColor: '#1e90ff',
                inactiveTintColor: 'gray',
                labelStyle: { fontSize: 16 , fontWeight: 'bold' },
            }}
            tabBarPosition={'bottom'}                        
        >                
            <Tab.Screen name="Roominfo" component={Roominfo} initialParams={params}/>
            <Tab.Screen name="UserList" component={UserList} initialParams={params}/>
        </Tab.Navigator>                
    );
};

export default Roomctrl;