import React from 'react'
import {Text, SafeAreaView, View, Button, Pressable} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';

function Announce ({ navigation }) {
    return(
        <WebView
            source={{ uri: 'https://www.loof.party/Notice' }}
            style={{ }}
        />
    );
};

export default Announce;