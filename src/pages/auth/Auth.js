import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  LayoutAnimation,
  NativeModules,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../components/custom-button/CustomButton';
import CustomInput from '../../components/custom-input/CustomInput';
import Color from '../../constants/Color';
import {styles} from './style';
import {Formik} from 'formik';
import {signUpSchema} from '../../helper/Schema';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as authActions from '../../store/actions/Auth';
import {useDispatch} from 'react-redux';

const {UIManager} = NativeModules;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const Auth = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onTogglePress = () => {
    LayoutAnimation.spring();
    setIsLogin(!isLogin);
  };

  const onIconPress = () => {
    setShowPassword(!showPassword);
  };

  const onReIocnPress = () => {
    setShowRePassword(!showRePassword);
  };

  const authHandler = async values => {
    setIsLoading(true);
    let action = authActions.signUp(values.email, values.password);
    if (isLogin) {
      action = authActions.login(values.email, values.password);
    }
    try {
      await dispatch(action);
      // setIsLoading(false);
      // navigation.navigate('homePage');
    } catch (error) {
      //TO Do need to handle error codes.
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleViewStyle}>
          <Text style={styles.titleStyle}>
            Custom Ecommerce {isLogin ? 'Login' : 'Sign-up'}
          </Text>
        </View>
        <Formik
          initialValues={{email: '', password: '', rePassword: ''}}
          onSubmit={authHandler}
          validationSchema={signUpSchema(isLogin)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={{paddingHorizontal: 20}}>
              <CustomInput
                title={'Email'}
                containerStyle={styles.viewMarginTop}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email.toLocaleLowerCase()}
                error={errors.email}
              />
              <CustomInput
                title={'Password'}
                containerStyle={styles.viewMarginTop}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.password}
                secureTextEntry={showPassword}
                icon={
                  <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={25}
                    color={Color.black}
                  />
                }
                onIconPress={onIconPress}
              />
              {!isLogin && (
                <CustomInput
                  title={'Confirm Password'}
                  containerStyle={styles.viewMarginTop}
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  value={values.rePassword}
                  error={errors.rePassword}
                  secureTextEntry={showRePassword}
                  icon={
                    <Icon
                      name={showRePassword ? 'eye' : 'eye-slash'}
                      size={25}
                      color={Color.black}
                    />
                  }
                  onIconPress={onReIocnPress}
                />
              )}
              {isLoading ? (
                <ActivityIndicator
                  color={Color.red}
                  size="small"
                  style={{...styles.viewMarginTop, height: 40}}
                />
              ) : (
                <CustomButton
                  title={isLogin ? 'Login' : 'Sign Up'}
                  containerStyle={styles.viewMarginTop}
                  onPress={handleSubmit}
                />
              )}
              <View style={styles.viewMarginTop}>
                <Text style={styles.alreadyTextStyle}>
                  {!isLogin ? 'Already have an account' : 'Create an account'}
                </Text>
                <CustomButton
                  title={isLogin ? 'Sign Up' : 'Login'}
                  containerStyle={{backgroundColor: Color.orange}}
                  onPress={onTogglePress}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
