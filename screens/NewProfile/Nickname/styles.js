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
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,        
    },
    nicknameInput: {
        width: Dimensions.get('window').width * 0.9,        
        height: Dimensions.get('window').width * 0.13,        
        borderRadius: 25,
        padding: 10,
        backgroundColor: '#FFF',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold'
    },
    btnFonts:{
        fontSize: 20,
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
    }
});

export default styles;