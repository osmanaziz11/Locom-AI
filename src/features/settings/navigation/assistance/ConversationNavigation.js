/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from 'src/components/common/Header';
import MessagesScreen from 'src/features/settings/components/assistance/Messages';
import ChatScreen from 'src/features/settings/components/assistance/Converstion';

const ConversationNavigation = () => {
  const Stack = createNativeStackNavigator();
  const STACK_CONFIG = {
    headerShown: true,
  };
  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      <Stack.Screen
        name="messages"
        component={MessagesScreen}
        options={{
          header: (props) => <Header {...props} showNotifications={false} title="Assistance Messages" />,
        }}
      />
      <Stack.Screen
        name="conversation"
        component={ChatScreen}
        options={{
          header: (props) => <Header {...props} showNotifications={false} title="Assistance Messages" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ConversationNavigation;
