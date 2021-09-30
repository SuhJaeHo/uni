import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  editContainer:{
    flex: 1,
    backgroundColor: '#fff',
  },
  headerConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#49ffbd', 
  },
  backIcon: {
    justifyContent:'center',
    alignItems:'center',
    fontWeight: 'bold',
    marginRight: 10,
    flexDirection:'row'
  },
  imageBoard: {
    width: 98,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 9,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 3, width: 3 },
  }, 
  //BottomSheet
  pickerButton: {
    width: '100%',
    height: 50,
    marginVertical: 3,
    flexDirection: 'row',    
  },
  intro_Title: {
    paddingLeft: 10,
    marginTop: 15,
  },
  intro_Input: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: "#fff",
    //backgroundColor: "#dcdcdc",
  },
  interest_Input: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
  btnFonts:{
    fontSize: 20,        
  },
  announceContainer: {
    marginLeft: Dimensions.get('window').width * 0.05, 
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
  interestContainer: {
    marginTop:30,
  },
  interestList: {
    marginHorizontal: Dimensions.get('window').width * 0.05,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor:'#fff',
    borderRadius: 25,
    paddingHorizontal: 15,    
    flexShrink: 1,
    justifyContent: 'center',
  },
  aboutContainer:{
    marginTop:30,
  },  
  aboutmeInput:{
    marginHorizontal: Dimensions.get('window').width * 0.05,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor:'#EBEAE9',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingTop: 10,
    flexShrink: 1
  },
});

export default styles;