/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import $auth from 'src/store/auth';

import { fetchUser } from 'src/api';
import firestore from '@react-native-firebase/firestore';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const token = useSelector(({ $auth }) => $auth.token);
  const user = useSelector(({ $auth }) => $auth.user);

  const agentSchema = {
    mode: 1,
    virtual_number: null,
    forward_number: null,
  };

  const agentConfiguration = async () => {
    const queryCollection = firestore().collection('agents');
    const documentSnapshot = await queryCollection.doc(user?.id).get();
    if (documentSnapshot.exists) {
      AsyncStorage.setItem('agent', JSON.stringify(documentSnapshot.data()));
    } else {
      queryCollection
        .doc(user?.id)
        .set(agentSchema)
        .then(() => {
          console.log('Added!');
          AsyncStorage.setItem('agent', JSON.stringify(agentSchema));
        });
    }
  };

  useEffect(() => {
    OneSignal.promptForPushNotificationsWithUserResponse(
      (res) => {
        console.log('fallbackToSettingsOrHandler', res);
      },
      (res) => {
        console.log('promptForPushNotificationsWithUserResponse', res);
      }
    );
    // OneSignal.setExternalUserId(externalUserId)
  }, []);

  useEffect(() => {
    if (token && user?.id) {
      OneSignal.setExternalUserId(user.id);

      fetchUser(user.id).then((res) => {
        console.log('fetchUser', res);
        if (!res.error) {
          dispatch($auth.set.user(res));
          agentConfiguration();
        } else {
          dispatch($auth.set.logout());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            })
          );
          navigation.navigate('Auth');
        }
      });
    }
  }, [token, user?.id]);

  return children;
};

export default AuthProvider;
