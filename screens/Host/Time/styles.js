import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        borderBottomWidth: 0.5,
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,        
    },
    timeInfoContainer: {
        alignItems: 'center',    
        marginBottom: 20,
    },
    timeInfoText: {
        fontSize: 20,
    },
    setBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        height: 45,
        width: Dimensions.get('window').width * 0.7,
        marginHorizontal: Dimensions.get('window').width * 0.15,
        backgroundColor: '#fb009e',
        borderRadius: 25,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
    }
});

export default styles;