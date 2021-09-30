import React from 'react'
import { View } from 'react-native';
import { CometChatUI } from '../../../lib/chat/cometchat-pro-react-native-ui-kit-3/src';

export default function Chat() {
     return (
          <View style={{flex: 1}}>
               <CometChatUI />
          </View>
     )
}
