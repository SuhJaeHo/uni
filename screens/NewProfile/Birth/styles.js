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
    announceContainer:{
        position: 'absolute',
        top: 20,        
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
    root: {padding: 20, minHeight: 300 , flexWrap: 'wrap', marginHorizontal:50},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 25,
        height: 30,
        lineHeight: 28,
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: '#000',
        alignSelf: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    btnFonts:{
        fontSize: 20
    }   
});

export default styles;