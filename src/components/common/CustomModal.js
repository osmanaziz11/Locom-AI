/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { AppText } from '../ui';
import { customModalStyle } from 'src/style/comman';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useEffect } from 'react';

const DoubleButton = ({
  primaryText,
  secondaryText,
  primaryHandler,
  secondaryHandler,
  ...props
}) => {
  console.log(props.loader);
  return (
    <>
      <Pressable
        onPress={primaryHandler}
        style={[customModalStyle.btn, customModalStyle.btnCancel]}
      >
        <AppText style={customModalStyle.cancelText}>{primaryText}</AppText>
      </Pressable>
      <Pressable
        onPress={() => secondaryHandler()}
        style={[customModalStyle.btn, customModalStyle.btnConfirm]}
      >
        {props.loader ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <AppText style={customModalStyle.confirmText}>
            {secondaryText}
          </AppText>
        )}
      </Pressable>
    </>
  );
};

const SingleButton = ({ text, handler, phoneNumber }) => {
  return (
    <>
      <Pressable
        onPress={() => handler(phoneNumber)}
        style={customModalStyle.btn}
      >
        <AppText>{text}</AppText>
      </Pressable>
    </>
  );
};

function CustomModal(props) {
  const { title, subtitle, action } = props;

  if (props.type === 'alert') {
    return (
      <Modal visible={props.isOpen} animationType="fade" transparent={true}>
        <View style={customModalStyle.parentContainer}>
          <View style={customModalStyle.modalContainer}>
            <AppText style={customModalStyle.alertTitle}>{title}</AppText>
            <AppText style={customModalStyle.alertSubtitle}>{subtitle}</AppText>
            <View style={customModalStyle.btnContainer}>
              {action.type === 'double' && <DoubleButton {...action} />}
            </View>
          </View>
        </View>
      </Modal>
    );
  } else if (props.type === 'input') {
    return (
      <Modal visible={props.isOpen} animationType="fade" transparent={true}>
        <View style={customModalStyle.parentContainer}>
          <View style={customModalStyle.modalContainer}>
            <AppText style={customModalStyle.inputTitle}>{title}</AppText>
            <AppText style={customModalStyle.inputSubtitle}>{subtitle}</AppText>
            <TextInput
              style={customModalStyle.inputField}
              placeholder="xx xxx xxx xxx"
              keyboardType="phone-pad"
              onChangeText={(text) => props.handleInput(text)}
            />
            <View style={customModalStyle.btnContainer}>
              {action.type === 'double' && <DoubleButton {...action} />}
              {action.type === 'single' && <SingleButton {...action} />}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default CustomModal;
