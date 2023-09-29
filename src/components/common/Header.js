/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import { HEADER_HEIGHT } from 'src/config';
import AppText from 'src/components/ui/AppText';
import {NotificationIcon, BackIcon} from 'src/assets/icons';

const Header = ({navigation, route, title, showNotifications = true, back}) => {
  const insets = useSafeAreaInsets();
  const handlePressNotifications = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, height: HEADER_HEIGHT + insets.top},
      ]}>
      {back ? (
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <View style={{width: 36}} />
      )}
      <AppText size={16}>{title}</AppText>
      {showNotifications ? (
        <TouchableOpacity
          style={styles.button}
          onPress={handlePressNotifications}>
          <NotificationIcon />
        </TouchableOpacity>
      ) : (
        <View style={{width: 36}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    borderBottomColor: 'rgba(228, 230, 232, 0.6)',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: 36,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
