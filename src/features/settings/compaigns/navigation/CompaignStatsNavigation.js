// eslint-disable-next-line prettier/prettier

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import Header from 'src/components/common/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompaingStats } from 'src/features/settings/compaigns/screens';

const CompaignStatsNavigation = () => {
  const Stack = createNativeStackNavigator();

  const STACK_CONFIG = {
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      {/* Main Screen  */}
      <Stack.Screen
        name="compaign/compaignStats/home"
        component={CompaingStats}
        options={{
          header: (props) => (
            <Header {...props} showNotifications={false} title="Compaign Analysis" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CompaignStatsNavigation;
