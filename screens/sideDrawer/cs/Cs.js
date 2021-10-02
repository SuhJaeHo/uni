import React from 'react'
import {Text, SafeAreaView, View, Button} from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

function Cs ({ navigation }) {
    return(          
        <WebView
            source={{ uri: 'https://www.loof.party/Contactus' }}
            style={{ }}
        />                             
    );
};

export default Cs;