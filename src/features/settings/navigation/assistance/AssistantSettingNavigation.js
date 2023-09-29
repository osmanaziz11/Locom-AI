// eslint-disable-next-line prettier/prettier
/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from "react";
import Header from "src/components/common/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingScreen } from "src/features/settings/screens/assistant";
import AssistantKnowledgeNavigation from "./AssistantKnowledgeNavigation";

const AssistantSettingNavigation = () => {
  const Stack = createNativeStackNavigator();

  const STACK_CONFIG = {
    headerShown: true,
  };

  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      {/* Main Screen  */}
      <Stack.Screen
        name="assistant/settingScreen"
        component={SettingScreen}
        options={{
          header: (props) => (
            <Header
              {...props}
              showNotifications={false}
              title="Assistant Settings"
            />
          ),
        }}
      />

      {/* Assistant Knowledge Navigation  */}
      <Stack.Screen
        name="assistant/settings/knowledge"
        component={AssistantKnowledgeNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AssistantSettingNavigation;
