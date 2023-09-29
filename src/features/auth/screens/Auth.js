/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {MAIN_COLOR} from 'src/config';
import $auth from 'src/store/auth';

import {LogoIcon} from 'src/assets/icons';
import Login from './Login';
import SignUp from './SignUp';
import AccountCreated from './AccountCreated';
import TurnGoogleFeature from 'src/components/common/TurnGoogleFeature';

const AuthScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [activeForm, setActiveForm] = useState('login');

  const handleChangeForm = form => {
    setActiveForm(form);
  };

  const handleLogin = (token, userId) => {
    dispatch($auth.set.token({token, userId}));
    navigation.navigate('Home');
  };

  const handleTurnFeature = () => {
    navigation.navigate('Home');
  };

  const handleSignUp = (token, userId) => {
    dispatch($auth.set.token({token, userId}));
    setActiveForm('account_created');
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top + 32}]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <LogoIcon />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={false}
        style={styles.content}>
        <Pressable
          style={{flex: 1, paddingBottom: insets.bottom}}
          onPress={Keyboard.dismiss}>
          {(form => {
            switch (form) {
              case 'login':
                return (
                  <Login
                    onChangeForm={handleChangeForm}
                    onSuccessLogin={handleLogin}
                  />
                );
              case 'signup':
                return <SignUp onSuccessSignUp={handleSignUp} />;
              case 'account_created':
                return <AccountCreated onChangeForm={handleChangeForm} />;
              case 'turn_google_feature':
                return <TurnGoogleFeature onTurnFeature={handleTurnFeature} />;
              default:
                return null;
            }
          })(activeForm)}
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    height: 700,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(245, 245, 250, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthScreen;
