import {StyleSheet} from 'react-native';
import Color from '../../constants/Color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleViewStyle: {
    alignItems: 'center',
    marginTop: 40,
  },
  titleStyle: {
    fontSize: 22,
    color: Color.red,
    fontWeight: '700',
  },
  viewMarginTop: {marginTop: 20},
  alreadyTextStyle: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
