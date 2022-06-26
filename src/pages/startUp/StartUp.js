import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from '../../constants/Color';
import * as authActions from '../../store/actions/Auth';

const StartUp = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log('useData', userData);
      if (!userData) {
        props.navigation.replace('SignUp');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId} = transformedData;
      dispatch(authActions.authenticate(userId, token));
    };
    tryLogin();
    // props.navigation.navigate('Home');
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="small" color={Color.red} />
    </SafeAreaView>
  );
};

export default StartUp;
