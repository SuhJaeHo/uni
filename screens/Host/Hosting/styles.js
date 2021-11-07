import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: '#fff',
        justifyContent:'flex-start',
        backgroundColor:'#49ffbd'
    },
    headerText:{
        fontSize:19,
        fontWeight:'500'
    },
    headerTextContainer:{
        justifyContent: 'center',        
        position:'absolute',
        width: Dimensions.get('window').width * 0.6,
        marginHorizontal:Dimensions.get('window').width * 0.2,
        alignItems:'center'        
    },
    backIcon: {
        justifyContent:'center',
        alignItems:'center',
        fontWeight: 'bold',
        marginRight: 10,
        flexDirection:'row'
    },
    contentContainer: {
        marginTop:10,
        height: Dimensions.get('window').height * 0.8,        
    },
    placeContainer: {
        marginVertical:10
    },
    placeText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    placeInput: {
        paddingLeft: 10,
        height: 50,
        height:Dimensions.get('window').height * 0.06,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        borderRadius: 25,
        paddingLeft:20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 2, width: 2 },
    },
    categoryContainer: {
        marginVertical:10
    },
    categoryText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    categoryInput: {
        paddingLeft: 10,
        height: 50,
        height:Dimensions.get('window').height * 0.06,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        paddingLeft:20,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 2, width: 2 },
    },
    titleConatiner: {
        marginVertical:10
    },
    titleText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    titleInput: {
        height:Dimensions.get('window').height * 0.07,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        backgroundColor: '#FFF',
        borderRadius:25,
        paddingLeft:20,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 2, width: 2 },        
    },
    timeConatiner: {
        marginVertical:10
    },
    timeText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    timeInput: {
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').height * 0.06,
        marginLeft: Dimensions.get('window').width * 0.05,        
        paddingLeft:20,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 2, width: 2 },
    },
    timePlaceHolder: {
        justifyContent: 'flex-start',
        marginRight: Dimensions.get('window').width * 0.35,
    },
    timeInfo: {
        flexDirection: 'row',
    },
    hostButton: {
        padding: 10,
        backgroundColor: '#49ffbd',
        height: 60,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 25,
        marginLeft: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:70,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 2, width: 2 },
        borderRadius:25,
    },
    modifyButton: {
        padding: 10,
        backgroundColor: '#49ffbd',
        height: 50,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 25,
        marginLeft: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:70,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 2, width: 2 },        
    }
});

export default styles;

