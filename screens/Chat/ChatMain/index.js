import React, {Component} from 'react'
import { View, BackHandler, LogBox } from 'react-native';
import { CometChatUI } from '../../../lib/chat/cometchat-pro-react-native-ui-kit-3/src';

export default class Chat extends Component {
     componentDidMount = () => {
          LogBox.ignoreAllLogs(true); 
          BackHandler.addEventListener('hardwareBackPress', this.backButtonClick); 
     }

     componentWillUnmount = async() => {
          BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
     }

     backButtonClick = () => {
          this.props.navigation.navigate('DrawerNav');
          return true;
     }


     render() {
          return (
               <View style={{flex: 1}}>
                    <CometChatUI />
               </View>
          )
     }
}
