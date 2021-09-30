import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({    
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
    },
    headerTextContainer:{
        width: Dimensions.get('window').width * 0.2,    
        marginHorizontal: Dimensions.get('window').width * 0.4,         
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'
    },
    headerText:{
       fontSize:18         
    }    
});

export default styles;