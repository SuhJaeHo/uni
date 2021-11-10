import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,       
        borderBottomWidth: 0.8,
        borderColor: 'rgba(158, 150, 150, .5)' 
    },
    headerTextContainer:{
        width: Dimensions.get('window').width * 0.2,    
        marginHorizontal: Dimensions.get('window').width * 0.4,    
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
     },
    headerText:{
        fontSize: 18
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
    },
    iconContainer: {
        backgroundColor: '#e7e7e7',
        padding: 7,
        borderRadius: 10,
        marginRight: 15,
    },
    textInput: {
        fontSize: 20,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    resultContainer: {
        borderWidth: 1, 
        paddingVertical: 7, 
        paddingHorizontal: 13, 
        borderRadius: 25
    }
});

export default styles;

