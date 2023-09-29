/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from '../ui';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

const OptionCard = ({ id,title, subtitle, text, navigation, path, toast,handler }) => {
  const message = {
    2: {
      title: 'Virtual Number',
      subtitle: 'You already have a virtual number',
    },
    3: {
      title: 'Business Number',
      subtitle: 'You already configure business number',
    },
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        text === 'Configure'
          ? toast(message[id])
          : path === 'handler'
          ? handler()
          : navigation.navigate(path)
      }
    >
      <View style={{ flexDirection: 'column' }}>
        <AppText>{title}</AppText>
        <AppText style={styles.secondaryText}>{subtitle}</AppText>
      </View>
      <View>
        <AppText style={styles.subText}>{text}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryText: {
    fontSize: 10,
    paddingTop: 3,
    fontWeight: 'light',
    color: 'rgba(23, 23, 33, 0.6)',
  },
  subText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'rgba(23, 23, 33, 0.6)',
  },
  subtitle: {
    fontSize: 10,
    color: 'gray',
  },
  card: {
    backgroundColor: '#fff',
    height: 60,
    width: '100%',
    borderRadius: 8,
    shadowColor: '#999BA8',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});
export default OptionCard;
