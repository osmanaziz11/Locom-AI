/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { VerifyIcon } from 'src/assets/icons';
import { AppText } from 'src/components/ui';
import { OtpInput } from '../../components/assistance';
import { useMutation } from '@tanstack/react-query';
import { VerifyOTP } from '../../api/assistant';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Verification({ route }) {
  const { mutate, isError, isLoading, data } = useMutation(VerifyOTP);
  const [loader, setLoader] = useState(false);

  const user = useSelector(({ $auth }) => $auth.user);

  const handleInput = (otp) => {
    const code = otp.join('');
    if (code.length === 4) {
      setLoader(true);
      mutate(route.params?.request_id, code);
    }
  };

  const updateFirestore = async () => {
    const agentRef = firestore().collection('agents').doc(user?.id);
    try {
      await agentRef.update({
        forward_number: route.params?.phoneNumber,
      });
      return true;
    } catch (error) {
      console.error('Error updating Firestore cache:', error);
      return false;
    }
  };

  const updateAsyncStorage = async () => {
    try {
      const agentCache = JSON.parse(await AsyncStorage.getItem('agent'));
      agentCache.forward_number = route.params?.phoneNumber;
      await AsyncStorage.setItem('agent', JSON.stringify(agentCache));
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  };

  const updateFS_CACHE = async () => {
    try {
      const firestoreSuccess = await updateFirestore();
      if (firestoreSuccess) {
        await updateAsyncStorage();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Verification',
          textBody: 'You have successfully configure forward number',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Alert',
          textBody: 'Something went wrong',
          button: 'close',
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error('Error in updateFS_CACHE:', error);
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Alert',
        textBody: 'Something went wrong',
        button: 'close',
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    if (isError) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Alert',
        textBody: 'Something went wrong',
        button: 'close',
        theme: 'dark',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setLoader(false);
      if (data === 200) {
        updateFS_CACHE();
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Verification',
          textBody: 'Invalid code',
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setLoader(true);
    }
  }, [isLoading]);

  return (
    <View style={[styles.parentContainer]}>
      <VerifyIcon width={200} height={200} />
      <AppText size={22} style={{ marginBottom: 20, marginTop: 20 }}>
        Number Verification
      </AppText>
      <AppText
        size={15}
        color="color: 'rgba(23, 23, 33, 0.6)'"
        style={{ marginBottom: 5 }}
      >
        Please enter the 4-digit code sent to
      </AppText>
      <AppText size={15} color="'rgba(23, 23, 33, 0.8)">
        {route.params?.phoneNumber}
      </AppText>
      <View style={styles.inputContainer}>
        <OtpInput length={4} handler={handleInput} isLoading={loader} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    justifyContent: 'start',
  },
  inputContainer: {
    marginTop: 30,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 30,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default Verification;
