import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {styles} from './style';

const CustomButton = props => {
  const {title, containerStyle, onPress} = props;
  return (
    <TouchableOpacity
      style={{...styles.buttonContainerStyle, ...containerStyle}}
      onPress={onPress}>
      <View style={styles.btnViewStyle}>
        <Text style={styles.buttonTitleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
