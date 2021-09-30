import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerConatiner: {
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
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    usersList: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'center',
        marginLeft: 5,
        justifyContent: 'space-between',
    },
    usersNick: {
        marginLeft: 10,
    },
    checkList: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        marginHorizontal: 10,
    },
    allowIcon: {
        fontSize: 28,
        marginRight: 5,
    },
    refuseIcon: {
        fontSize: 28,
    }
});

export default styles;

