// eslint-disable-next-line prettier/prettier

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navActive } from 'src/store/bottomNav';
import Header from 'src/components/common/Header';
import { MainScreen } from 'src/features/settings/compaigns/screens';
import { CompaignStatsNavigation, ExistingCompaignNavigation } from 'src/features/settings/compaigns/navigation';
import NewCompaignNavigation from './NewCompaignNavigation';

const CompaignNavigation = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

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
      {/* Main Screen  */}
      <Stack.Screen
        name="compaign/home"
        component={MainScreen}
        options={{
          header: (props) => (
            <Header {...props} showNotifications={false} title="Compaigns" />
          ),
        }}
      />
      {/* New Compaign   */}
      <Stack.Screen
        name="compaign/newCompaign"
        component={NewCompaignNavigation}
        options={{
          headerShown: false,
        }}
      />

      {/* Existing  Compaign   */}
      <Stack.Screen
        name="compaign/existingCompaign"
        component={ExistingCompaignNavigation}
        options={{
          headerShown: false,
        }}
      />


    </Stack.Navigator>
  );
};

export default CompaignNavigation;
