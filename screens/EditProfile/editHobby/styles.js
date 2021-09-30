import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  headerConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#49ffbd',
    height: 50,      
  },
  listContainer: {    
    width: Dimensions.get('window').width,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginHorizontal: Dimensions.get('window').width * 0.05,
  },
  selectBox: {
    height: 50,
    backgroundColor:'#fff',  
    marginRight: 20, 
    marginVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 3, width: 3 },
  },
  selectedBox: {
    height: 50,    
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 2, 
    marginRight: 20, 
    marginVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 3, width: 3 },
  },
  boxText:{
    fontSize:20
  },
  vaccum: {
    width: Dimensions.get('window').width,
    height: 5,    
  },
  listName:{
    fontSize: 30, 
    marginTop: 30
  },
  announceContainer:{
    marginLeft: Dimensions.get('window').width * 0.05,
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