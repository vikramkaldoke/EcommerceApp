import * as Yup from 'yup';
export const signUpSchema = isLogin =>
  Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email id.')
      .required('Required'),
    password: Yup.string()
      .min(5, 'Minimum password length should be 5.')
      .required('Required'),
    rePassword:
      !isLogin &&
      Yup.string().when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .oneOf([Yup.ref('password')], 'Both password need to be the same')
          .required(!isLogin ? null : 'Required'),
      }),
  });
