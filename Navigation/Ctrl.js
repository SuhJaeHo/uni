import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../screens/Main/index';
import MyMapView  from '../Components/MyMapView';
import Announce from '../screens/sideDrawer/announce/Announce';
import History from '../screens/sideDrawer/history/History';
import Rank from '../screens/sideDrawer/rank/Rank';
import Cs from '../screens/sideDrawer/cs/Cs';
import Setting from '../screens/sideDrawer/setting/Setting';

import CustomSidebarMenu from './customSidebar';
import EditProfile from '../screens/EditProfile';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
    useEffect(() => {  
        props.navigationProps.addListener('focus', () => {
            closeDrawer(); 
        })                   
    }, []);

    const closeDrawer = () => {
        props.navigationProps.closeDrawer();
    }
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };
    return (
        <View style={{ zIndex:100, left:10 }}>
            <Pressable 
                onPress={()=> toggleDrawer()}
            >
                <Ionicons name="ios-menu" color="#fb009e" size={48} /> 
            </Pressable>
        </View>
    );
}

function homeScreenStack({ route, navigation }) {       
    return (
        <Stack.Navigator initialRouteName="HomePage">            
            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    title: '', 
                    headerLeft: ()=>
                    <NavigationDrawerStructure
                        navigationProps={navigation}                        
                    />,
                    headerShown: true,
                    headerTransparent: true,                    
                }}                          
                initialParams={{params: route.params}}                                           
            >                
            </Stack.Screen>            
            <Stack.Screen
                name={"EditProfile"}
                component={EditProfile}
                options={{
                    headerShown: true,    
                }}
            />          
        </Stack.Navigator>
    );
}

export default function DrawerNav({ route, navigation }) {          
    return (                        
        <Drawer.Navigator                  
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 5 },            
            }}            
            drawerContent={(props) => <CustomSidebarMenu {...props} />}     
            drawerStyle={{
                width: Dimensions.get('window').width * 0.82
            }}       
        >              
            <Drawer.Screen
                name="HomePage"
                options={{ 
                    drawerLabel: 'Home 🏠' ,
                }}
                component={homeScreenStack}     
                initialParams={{params: route.params}}                
            >
            </Drawer.Screen>
            <Drawer.Screen
                name="FirstPage"
                options={{ 
                    drawerLabel: '공지사항 📋',                
                    headerShown: false,
                }}
                component={Announce} 
            />
            <Drawer.Screen
                name="고객지원"
                options={{ 
                    drawerLabel: '고객지원 👩🏻‍💻',
                    headerShown: false,        
                }}
                component={Cs} 
            />
            <Drawer.Screen
                name="SetPage"
                options={{ 
                    drawerLabel: 'Setting ⚙️',
                    headerShown: false,                    
                }}                              
                component={Setting} 
            />
        </Drawer.Navigator>
    );
}

  