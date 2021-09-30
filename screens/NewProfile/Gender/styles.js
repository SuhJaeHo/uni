import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({    
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,     
    },
    back: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 30,
        marginLeft: 10,
        fontWeight:'bold'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,            
    },
    selectboxContainer: {
       position: 'absolute',
       flexDirection: 'row',
    },
    announceContainer:{
        position: 'absolute',
        top: 20
    },
    announceTitle:{
        fontSize: 75,
        color: '#000',
        fontWeight: 'bold'
    },
    announce:{
        fontSize: 35,
        color: '#000',
    },
    announceSpecific:{
        fontSize: 18,
        color: 'grey',
        lineHeight: 70
    },
    btnFonts:{
        fontSize:35,
    },
    linearGradient: { 
        borderRadius: 20
    },
});

export default styles;