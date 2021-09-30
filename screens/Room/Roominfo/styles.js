import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    infoContainer:{
        height: Dimensions.get('window').height*0.65,
    },
    l1Container:{
        flexDirection: 'row',
        height: 100,
        marginTop: 20,    
    },
    category:{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
    },
    time:{
        flex: 2,
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
    },
    title:{
        backgroundColor: '#fff',
        borderRadius: 25,
        margin: 10,
        height: 100,
        padding: 14,
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },     
    },
    host:{
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 10,
        margin: 10,
        height: 80,
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
    },
    location:{
        backgroundColor: '#fff',
        borderRadius: 25,
        margin: 10,
        height: 100,
        padding: 14,
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
    },
    btnContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatBtn:{
        width: Dimensions.get('window').width*0.7,
        height: 50,
        backgroundColor: '#fb009e',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },                     
    },
    editBtn:{
        width: Dimensions.get('window').width*0.7,
        height: 50,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },     
    },
    delBtn:{
        width: Dimensions.get('window').width*0.7,
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },     
    },
    chatBtnText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    dateText:{
        fontSize: 20,
        marginBottom: -5
    },
    timeText:{
        fontSize: 45,
        fontWeight: 'bold'        
    },
    titleText:{
        fontSize: 30,
        marginLeft: 5
    },
    locationText:{
        fontSize: 23,     
    },  
});

export default styles;