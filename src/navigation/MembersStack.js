import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Header from 'src/components/common/Header'

import MembersScreen from 'src/features/members/screens/Members'
import MemberCreateScreen from 'src/features/members/screens/MemberCreate'
import MemberProceedPayScreen from 'src/features/members/screens/MemberProceedPay'

const Stack = createNativeStackNavigator()

const STACK_CONFIG = {
  headerShown: true
}

const MemberStack = () => {
  return (
    <Stack.Navigator screenOptions={STACK_CONFIG}>
      <Stack.Screen
        name="List"
        component={MembersScreen}
        options={{
          header: (props) => <Header {...props} title="Team members" />
        }} />
      <Stack.Screen
        name="MemberCreate"
        component={MemberCreateScreen}
        options={{
          header: (props) => <Header {...props} showNotifications={false} title="" />
        }} />
      <Stack.Screen
        name="MemberProceedPay"
        component={MemberProceedPayScreen}
        options={{
          header: (props) => <Header {...props} showNotifications={false} title="Pay for team members" />
        }} />
    </Stack.Navigator>
  )
}

export default MemberStack
