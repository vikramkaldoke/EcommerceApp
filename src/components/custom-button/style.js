import {StyleSheet} from 'react-native';
import Color from '../../constants/Color';

export const styles = StyleSheet.create({
  buttonContainerStyle: {
    backgroundColor: Color.red,
    height: 45,
    borderRadius: 5,
  },
  buttonTitleStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  btnViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
