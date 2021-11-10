import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    infoContainer:{
        height: Dimensions.get('window').height*0.5,
    },
    l1Container:{
        flexDirection:'row',
        height:90,
        marginTop:10,        
    },
    sectionName:{        
        fontSize:18,
        fontFamily:'Jost-Medium'        
    },
    category:{
        flex:1,
        backgroundColor:'#fff',
        borderRadius:25,
        padding:10,
        marginLeft:-20,
        justifyContent:'center',
        alignItems:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 15,
    },
    time:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        padding:10,
        margin:10,
        alignItems:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 15,        
    },
    l2Container:{
        //marginTop:20
    },
    l3Container:{

    },
    timeContainer:{
        flexDirection:'row',
        marginTop:20
    },
    title:{
        backgroundColor:'#fff',
        borderRadius:25,
        margin:10,
        height:100,
        padding:14,
        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        height: Dimensions.get('window').height*0.15,
        elevation: 15,
    },
    host:{
        backgroundColor:'#fff',
        borderRadius:25,
        padding:10,
        margin:10,
        height:80,
        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 15,
    },
    location:{
        backgroundColor:'#fff',
        borderRadius:25,
        margin:10,
        height:100,
        padding:14,
        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 15,
        height: Dimensions.get('window').height*0.15,        
    },
    btnContainer:{
        alignItems:'center',
        marginTop: 100,
    },
    chatBtn:{
        width: Dimensions.get('window').width*0.7,
        height:50,
        backgroundColor:'#1e90ff',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        borderRadius:25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },       
        elevation: 15,        
    },
    editBtn:{
        width: Dimensions.get('window').width*0.7,
        height:50,
        backgroundColor:'#dddddd',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        borderRadius:25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },     
        elevation: 15,
    },
    delBtn:{
        width: Dimensions.get('window').width*0.7,
        height:50,
        backgroundColor:'#a9a9a9',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
        borderRadius:25,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 }, 
        elevation: 15,    
    },
    chatBtnText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        fontFamily:'Jost-Bold'        
    },
    dateText:{
        fontSize:22,        
        fontFamily:'Jost-Medium'
    },
    timeText:{
        fontSize:22,        
        fontFamily:'Jost-Medium',                
    },
    titleText:{
        fontSize:18,
        fontFamily:'Jost-Medium'
    },
    locationText:{
        fontSize:18,
        fontFamily:'Jost-Medium'     
    },     
});

export default styles;