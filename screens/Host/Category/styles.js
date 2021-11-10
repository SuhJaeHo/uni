import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    fullConatiner: {
        backgroundColor: 'white',
    },
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',        
    },
    backIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    listContainer: {
        paddingVertical: 20,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',        
    },
});

export default styles;
