import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native';

import ActionButton from 'react-native-action-button';

export default class filterButton extends Component { 
    render() {
        return (       
            <ActionButton
                size={48}
                buttonColor="#fb009e" 
                verticalOrientation="down"
            >

            </ActionButton>
        )
    }
}
