// eslint-disable-next-line prettier/prettier

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import Header from 'src/components/common/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExistingCompaing from '../screens/ExistingCompaign';

const ExistingCompaignNavigation = () => {
  const Stack = createNativeStackNavigator();

  const STACK_CONFIG = {
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      {/* Main Screen  */}
      <Stack.Screen
        name="compaign/existingCompaing"
        component={ExistingCompaing}
        options={{
          header: (props) => (
            <Header {...props} showNotifications={false} title="Existing Compaign" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ExistingCompaignNavigation;
