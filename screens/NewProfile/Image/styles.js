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
    marginVertical: 10,
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
    position:'absolute',
    top: 20,
    marginLeft: 20
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
});

export default styles;