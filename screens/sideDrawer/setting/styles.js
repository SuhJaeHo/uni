import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({    
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: '#fff',
        justifyContent:'flex-start',        
        height: 50,
    },
    headerTextContainer:{
        width: Dimensions.get('window').width * 0.2,    
        marginHorizontal: Dimensions.get('window').width * 0.4,         
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
    },
    headerText:{        
        fontSize:19,
        fontWeight:'500',                                  
    },
    backIcon: {
        fontWeight: 'bold',
        marginRight: 10,
        flexDirection:'row'
    },
    textBtn:{
        width:"100%",
        alignItems:'flex-start',
        fontSize:25,
        marginLeft:20,
        marginVertical:5        
    }    
});

export default styles;