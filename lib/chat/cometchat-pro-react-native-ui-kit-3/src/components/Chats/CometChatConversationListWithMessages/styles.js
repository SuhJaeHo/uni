import { StyleSheet } from 'react-native';
import theme from '../../../resources/theme';
import { widthRatio, heightRatio } from '../../../utils/consts';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    paddingRight: 12,
    elevation: 5,
    backgroundColor: '#fff',
    zIndex: 5,
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 20,
    color: theme.color.blue,
  },
  headerDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});