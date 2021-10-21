import React from 'react';
import {
  View,
  Text,
  TextInput,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';

const CustomInput = props => {
  const {title, error, placeHolder, containerStyle, icon, onIconPress} = props;
  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputViewStyle}>
        <TextInput
          placeholder={placeHolder}
          style={styles.inputStyle}
          {...props}
        />
        {icon && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}
            onPress={onIconPress}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorTextStyle}>{error}</Text>}
    </View>
  );
};

CustomInput.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.any,
  placeHolder: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
  onIconPress: PropTypes.func,
};

CustomInput.propTypes = {
  error: null,
  containerStyle: null,
  onIconPress: null,
};

export default CustomInput;
