// eslint-disable-next-line prettier/prettier
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import Header from 'src/components/common/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssistanceScreen from 'src/features/settings/screens/AI_Assistance';
import {
  ModeScreen,
  TestingScreen,
  VerificationScreen,
} from 'src/features/settings/screens/assistant';
import AssistantSettingNavigation from './AssistantSettingNavigation';
import BusinessNumberScreen from '../../components/assistance/BusinessNumber';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { navActive } from 'src/store/bottomNav';

const AssistanceNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const STACK_CONFIG = {
    headerShown: true,
  };

  useEffect(() => {
    dispatch(navActive(false));
    return () => {
      dispatch(navActive(true));
    };
  }, []);

  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      {/* AI-Powered Navigation  */}

      {/* Main Screen  */}
      <Stack.Screen
        name="assistant/home"
        component={AssistanceScreen}
        options={{
          header: (props) => (
            <Header {...props} showNotifications={true} title="AI Assistance" />
          ),
        }}
      />

      {/* Assistant Modes Screen  */}
      <Stack.Screen
        name="assistant/modeScreen"
        component={ModeScreen}
        options={{
          header: (props) => (
            <Header
              {...props}
              showNotifications={false}
              title="Assistant Modes"
            />
          ),
        }}
      />

      {/* Assistant Virtal Number Screen  */}
      <Stack.Screen
        name="assistant/virtualNumberScreen"
        component={BusinessNumberScreen}
        options={{
          header: (props) => (
            <Header
              {...props}
              showNotifications={false}
              title="Virtual Numbers"
            />
          ),
        }}
      />

      {/* Assistant Testing Screen  */}
      <Stack.Screen
        name="assistant/testingScreen"
        component={TestingScreen}
        options={{
          header: (props) => (
            <Header
              {...props}
              showNotifications={false}
              title="Assistant Testing"
            />
          ),
        }}
      />

      {/* Assistant Setting Navigation  */}
      <Stack.Screen
        name="assistant/settingScreen"
        component={AssistantSettingNavigation}
        options={{
          headerShown: false,
        }}
      />

      {/* **************  */}
      {/* OTP Verification Screen  */}
      <Stack.Screen
        name="assistant/verification"
        component={VerificationScreen}
        options={{
          header: (props) => (
            <Header {...props} showNotifications={false} title="" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AssistanceNavigation;
