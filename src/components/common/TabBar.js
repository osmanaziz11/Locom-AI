/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from 'src/config';
import {
  CircleIcon,
  PhoneIcon,
  MessageIcon,
  SettingIcon,
  NotificationIcon,
  RequestIcon,
  TeamMemeberIcon,
} from 'src/assets/icons';
import { useSelector } from 'react-redux';

const TAB_CONFIG = {
  Analytics: {
    icon: CircleIcon,
  },
  Reviews: {
    icon: PhoneIcon,
  },
  Feedbacks: {
    icon: MessageIcon,
  },
  Notifications: {
    icon: NotificationIcon,
  },
  Requests: {
    icon: RequestIcon,
  },
  Members: {
    icon: TeamMemeberIcon,
  },
  Profile: {
    icon: SettingIcon,
  },
};

const TabStack = ({ navigation, state }) => {
  const { isActive } = useSelector((curr) => curr.bottomNav);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          display: `${isActive ? 'block' : 'none'}`,
        },
      ]}
    >
      <View style={styles.content}>
        {state.routes.map((route) => {
          const Icon = TAB_CONFIG[route.name].icon;
          const isFocused = state.routes[state.index].name === route.name;

          const onPress = () => {
            if (isFocused) {
              return;
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              style={[
                styles.tab,
                { borderColor: isFocused ? '#33C5EC' : 'transparent' },
              ]}
              onPress={onPress}
            >
              <Icon
                width={22.5}
                height={22.5}
                color={isFocused ? '#fff' : '#c0c0c0'}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 15,
    width: '100%',
  },
  content: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: '#000',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.51,
    elevation: 20,
  },
  tab: {
    height: 56,
    marginHorizontal: 18,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderColor: '#33C5EC',
  },
});

export default TabStack;
