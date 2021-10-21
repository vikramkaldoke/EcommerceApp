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
  title: {fontSize: 18},
  inputViewStyle: {
    flexDirection: 'row',
    borderColor: Color.lightGrey,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
  },
  inputStyle: {
    height: 40,
    fontSize: 18,
    marginHorizontal: 5,
    flex: 1,
  },
  errorTextStyle: {
    marginTop: 5,
    color: Color.red,
    fontSize: 14,
  },
});
