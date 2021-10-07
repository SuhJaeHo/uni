import React, {Component} from 'react'
import {View, Text, TextInput, Pressable, FlatList, BackHandler} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Hangul from 'hangul-js';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            list: [],
            allCategories: [],
            historyCategories: [],
            category: '',
            selectCategory: '',
        }
    }

    componentDidMount = () => {
        this.connect();

        BackHandler.addEventListener('hardwareBackPress', this.backButtonClick); 
    }

    componentWillUnmount = async() => {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
        this.props.navigation.goBack();
        return true;
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

        const URL = "http://localhost:3000/category";
        //const URL = "http://10.0.2.2:3000/category";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
            })
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData[0]);
            console.log(responseData[1]);
            if(responseData[1].length === 0) {
                this.setState({
                    list: responseData[0]
                })
            }else {
                this.setState({
                    list: responseData[1],
                    historyCategories: responseData[1],
                })
            }

            this.setState({allCategories: responseData[0]})
        })
    }

    search = async(text) => {
        this.state.list = [];
        this.state.category = text;
        this.setState({category: text});
        
        var inputText = Hangul.disassemble(text);
        if(inputText.length !== 0) {
            var cnt = 0;

            this.state.allCategories.map(data => {
                for(let i = 0; i < inputText.length; i++) {
                    if(inputText[i] === Hangul.disassemble(data.category)[i]) {
                        cnt+=1;
                    }
                }

                if(cnt === inputText.length) {
                    this.state.list.push(data);
                }

                cnt = 0;
            })
        }else {
            if(this.state.historyCategories.length === 0) {
                this.setState({
                    list: this.state.allCategories
                })
            }else {
                this.setState({
                    list: this.state.historyCategories
                })
            }
        }
    }

    render() {
        return (
            <View style={styles.fullConatiner}>
                <View style={styles.headerConatiner}>
                    <AntDesign
                        name={"arrowleft"}
                        style={styles.backIcon}
                        onPress={() => this.props.navigation.push('Hosting', {category: this.state.selectCategory, Info: 'category'})}
                    />                    
                    <TextInput
                        placeholder="카테고리를 입력하세요"
                        onChangeText={text => this.search(text)}
                        value={this.state.category}
                    />
                </View>
                <FlatList 
                    data={this.state.list}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.listContainer}>
                                <Pressable
                                    onPress={() =>
                                        {
                                            this.setState({selectCategory: item.category,});
                                            this.props.navigation.push('Hosting', {category: item.category, Info: 'category'})
                                        }
                                    }
                                >
                                    <Text>{item.category}</Text>
                                </Pressable>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item._id}
                />
            </View>
        )
    }
}