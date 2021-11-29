import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    infoContainer:{
        height: Dimensions.get('window').height * 0.5,
    },
    l1Container:{
        flexDirection: 'row',
        height: Dimensions.get('window').height * 0.12,
        marginTop: 5,        
    },
    sectionName:{        
        fontSize: 18,
        fontFamily: 'Jost-Medium',
        alignContent: 'center',
    },
    category:{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 10,
        marginLeft: -20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 30,
    },
    time:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        paddingVertical: 10,        
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 30,        
    },
    l2Container:{
        
    },
    l3Container:{
        
    },
    timeContainer:{
        flexDirection: 'row',
        marginTop: 10
    },
    title:{
        backgroundColor: '#fff',
        borderRadius: 25,
        margin: 10,
        height: Dimensions.get('screen').height * 0.12,
        padding: 14,
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },        
        elevation: 30,
    },    
    location:{
        backgroundColor: '#fff',
        borderRadius: 25,
        margin: 10,
        height: Dimensions.get('screen').height * 0.12,
        padding: 14,
        justifyContent: 'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 30,        
    },
    btnContainer:{
        alignItems:'center',
        marginTop: Dimensions.get('screen').height * 0.07,
    },
    chatBtn:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('screen').height * 0.06,
        backgroundColor: '#fb009e',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },       
        elevation: 30,        
    },
    editBtn:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('screen').height * 0.06,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },     
        elevation: 30,
    },
    delBtn:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('screen').height * 0.06,
        backgroundColor: '#a9a9a9',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 }, 
        elevation: 30,    
    },
    reportBtn:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('screen').height * 0.06,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 }, 
        elevation: 30,    
    },
    chatBtnText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        fontFamily:'Jost-Bold'        
    },
    reportBtnText:{
        fontSize:20,
        fontWeight:'bold',
        color:'red',
        fontFamily:'Jost-Bold' 
    },
    dateText:{
        fontSize: 20,        
        fontFamily: 'Jost-Medium'
    },
    timeText:{
        fontSize: 20,        
        fontFamily: 'Jost-Medium',                
    },
    titleText:{
        fontSize: 18,
        fontFamily: 'Jost-Medium'
    },
    locationText:{
        fontSize:18,
        fontFamily:'Jost-Medium'     
    },     
});

export default styles;