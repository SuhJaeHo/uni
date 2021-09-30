import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, ScrollView, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class RoomList extends Component {
     constructor(props) {
            super(props);
            this.state = {
                id: '',
                roomInfo: [],               
                list: [],
            }
     }
  
     componentDidMount = async() => {
          this.connect();
     }

     connect = async() => {
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

          const URL = "http://localhost:3000/roomList";
          fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: this.state.id,
              }),
          })
          .then(response => response.json())
          .then(responseData => {
              this.setState({
                  roomInfo: responseData,
              })
          })          
     }

     showRoomList = () => {
          let roomList = [];
          var key = 0;
          
          if(this.state.roomInfo !== 0) {
               this.state.roomInfo.map(data => roomList.push (
                    <View
                         style={styles.cardContainer}
                         key={key++}
                    >
                         <View style={styles.roomCard}>
                              <Pressable
                                   onPress={() => this.props.navigation.push('Roomctrl', 
                                        {sendd: data}
                                   )}
                              >
                                   <View style={styles.categoryIcon}>
                                        <Text style={styles.categoryText}>{data.category}</Text> 
                                   </View>
                                   <View style={styles.infoContainer}>
                                        <View style={styles.titleContainer}>
                                             <Text numberOfLines={1} style={styles.titleText}>{data.title}</Text>
                                        </View>                                   
                                        <Text numberOfLines={2} style={styles.locationText}>{data.address}</Text>                    
                                        <Text style={styles.timeText}>{data.timeInfo}~</Text>
                                   </View>                              
                              </Pressable>    
                         </View>
                    </View>
               ))
     
               return roomList;
          }                   
     }

     render() {
          return (
               <ScrollView style={{backgroundColor:'#fff'}}>                   
                    <View style={styles.sectionConatiner}>
                         <Text style={styles.sectionText}>
                              Hosting Rooms
                         </Text>
                    </View>                      
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>                 
                         {this.showRoomList()}                                                
                    </View>
                    <Text style={styles.sectionText}>
                         Join Rooms
                    </Text>                     
               </ScrollView>
          )
     }
}