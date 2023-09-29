/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IndexedScreen } from '../screens';
import { AssistanceNavigation } from './assistance';
import OnboardingScreen from '../components/assistance/onBoarding';

const SettingsNavigation = () => {
  const Stack = createNativeStackNavigator();

  const STACK_CONFIG = {
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      {/* Setting navigation  */}

      {/*  Main screen  */}
      <Stack.Screen
        name="indexScreen"
        component={IndexedScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* AI-Powered Navigation  */}
      <Stack.Screen
        name="assistance"
        component={AssistanceNavigation}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="assistance/onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Other Navigation  */}
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
