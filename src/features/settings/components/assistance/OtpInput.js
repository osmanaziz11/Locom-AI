/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { Pressable } from 'react-native';
import { View, TextInput, StyleSheet } from 'react-native';
import { AppText, Button } from 'src/components/ui';

const OtpInput = ({ length = 6, handler, isLoading = false }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Handle text input change for a specific index
  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move focus to the next input field (if available)
    if (index < length - 1 && text.length === 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle text input backspace to move to the previous input field
  const handleInputBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <View style={styles.container}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={(e) => handleInputBackspace(e, index)}
            ref={(input) => (inputRefs.current[index] = input)}
            maxLength={1}
            keyboardType="numeric"
          />
        ))}
      </View>
      <Pressable style={styles.verifyBtn} onPress={() => handler(otp)} >
        {isLoading ? (
          <ActivityIndicator size="small" color="rgba(23, 23, 33, 0.6)" />
        ) : (
          <AppText size={15} color="rgba(23, 23, 33, 0.8)">
            Verify
          </AppText>
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verifyBtn: {
    borderRadius: 7,
    width: '200',
    backgroundColor: 'rgba(23, 23, 33, 0.1)',
    marginTop: 30,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    margin: 5,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OtpInput;
