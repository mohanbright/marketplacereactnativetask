import React from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {responsiveHeight} from '../../constants';
import colors from '../../constants/colors';
import CustomText from '../CustomText';

function CustomInput({
  dimension,
  marginTop = 0,
  imageSrc = null,
  textInputLabel,
  imageOnPress = null,
  secureTextEntry = false,
  placeholder = 'abc@gmail.com/abc',
  onChangeText = null,
  value = '',
  ...props
}) {
  return (
    <View
      style={{
        marginTop,
      }}>
      <CustomText
        fontSize={14}
        lineHeight={24}
        color={colors.grey}
        textAlign={'left'}>
        {textInputLabel}
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 56,
          borderWidth: 0.5,
          borderColor: colors.green,
          backgroundColor: colors.wgm3,
          borderRadius: 6,
          marginTop: 8,
          paddingHorizontal: 16,
          alignItems: 'center',
        }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          secureTextEntry={secureTextEntry}
          style={{
            flex: 1,
            color: colors.black800,
            fontSize: responsiveHeight(dimension, 14),
            lineHeight: responsiveHeight(dimension, 17),
          }}
          value={value}
          onChangeText={text => onChangeText && onChangeText(text)}
        />
        {imageSrc && (
          <TouchableOpacity onPress={() => imageOnPress && imageOnPress()}>
            <Image source={imageSrc} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const mapStatetoProps = state => ({dimension: state.deviceDimensionReducer});
export default connect(mapStatetoProps)(CustomInput);
