/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';

import TabBar from 'src/components/common/TabBar';
import Header from 'src/components/common/Header';

import AnalyticsScreen from 'src/features/analytics/screens/Analytics';
import ReviewsScreen from 'src/features/reviews/screens/Reviews';
import FeedbacksScreen from 'src/features/feedback/screens/Feedbacks';
import RequestsScreen from 'src/features/requests/screens/Requests';
import MembersStack from './MembersStack';
import { SettingScreen } from 'src/features/settings/screens';
import SettingsNavigation from 'src/features/settings/navigation';

const Stack = createBottomTabNavigator();

const STACK_CONFIG = {
  headerShown: true,
};

const routesToExclude = ['Auth', 'Splash'];

const TabStack = ({navigation}) => {
  useEffect(() => {
    navigation.dispatch(state => {
      const routes = state.routes.filter(
        r => !routesToExclude.includes(r.name),
      );
      const diff = state.routes.length - routes.length;
      return CommonActions.reset({...state, routes, index: state.index - diff});
    });
  }, []);

  return (
    <Stack.Navigator

      screenOptions={STACK_CONFIG}
      tabBar={props => <TabBar {...props} />}>
      <Stack.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          header: props => <Header {...props} title="Analytics" />,
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          header: props => <Header {...props} title="Google Reviews" />,
        }}
      />

      <Stack.Screen
        name="Feedbacks"
        component={FeedbacksScreen}
        options={{
          header: props => <Header {...props} title="Employee feedback" />,
        }}
      />
      <Stack.Screen
        name="Members"
        component={MembersStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          header: props => <Header {...props} title="Approval & Deny" />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={SettingsNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TabStack;
