// eslint-disable-next-line prettier/prettier
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from "react";
import Header from "src/components/common/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  FAQsScreen,
  KnowledgeScreen,
} from "src/features/settings/screens/assistant";

const AssistantKnowledgeNavigation = () => {
  const Stack = createNativeStackNavigator();

  const STACK_CONFIG = {
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      {/* Main Screen  */}
      <Stack.Screen
        name="assistant/setting/knowledge"
        component={KnowledgeScreen}
        options={{
          header: (props) => (
            <Header
              {...props}
              showNotifications={false}
              title="Assistant Knowledge"
            />
          ),
        }}
      />

      {/* FAQs Screen  */}
      <Stack.Screen
        name="assistant/setting/knowledge/FAQs"
        component={FAQsScreen}
        options={{
          header: (props) => (
            <Header
              {...props}
              showNotifications={false}
              title="Assistant Knowledge"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AssistantKnowledgeNavigation;
