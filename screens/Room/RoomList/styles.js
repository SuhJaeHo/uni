import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    sectionConatiner: {        
        height: 40,
        justifyContent:'center',        
    },
    sectionText:{
        fontSize:20,
        marginLeft:20,
        backgroundColor:"#fff",
        zIndex:10,
        fontWeight:'bold',
        marginTop:15,
        color:'grey'
    },
    renderContainer:{
        backgroundColor:'#fff',
        flex:1
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    roomCard: {
        width: Dimensions.get('window').width*0.9,
        marginHorizontal: Dimensions.get('window').width*0.05,
        height: Dimensions.get('window').width*0.3,
        padding:15,
        marginVertical: 15,
        borderRadius:25,
        backgroundColor:'#fff',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        elevation: 5,
        resizeMode:'contain',
        flexDirection:'row',
        alignItems:'center',
        borderWidth:3,
        borderColor:'#fb009e',
        backgroundColor:'#FAFAFA'        
    },  
    titleContainer:{
        width:100,        
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold',                
    },
    locationText:{
        fontSize:14,
        color:'grey',
        marginTop:10
    },  
    timeText:{
        fontSize:15,
        marginTop:10        
    },
    categoryIcon:{
        backgroundColor:'#fff',
        width:80,
        height:80,
        borderRadius:50,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:4,
        borderColor:"#96FFD9"                
    },
    categoryText:{
        fontSize:20,
        color:'#fff',
        marginLeft:-3,
        color:'#000'
    },
    infoContainer:{
        flex:3,
        marginLeft:13                
    }
});

export default styles;