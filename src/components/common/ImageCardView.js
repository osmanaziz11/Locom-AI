/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { AppText } from '../ui';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

function ImageCardView({
  id,
  title,
  subtitle,
  active,
  loader,
  handleClick,
  disabled,
}) {
  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPress={() => handleClick(id)}
      style={{ paddingHorizontal: 10 }}
    >
      <View
        style={[
          styles.ImageCardViewContainer,
          active ? styles.active : styles.disabled,
        ]}
      >
        {id === loader && (
          <View style={styles.indicator}>
            <ActivityIndicator size="small" color="rgba(23, 23, 33, 23)" />
          </View>
        )}
        <AppText style={styles.modeText}>{title}</AppText>
        <AppText style={styles.modeSubText}>{subtitle}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 22,
  },
  disabled: {
    opacity: 0.2,
    backgroundColor: '#fff',
  },
  modeText: {
    fontSize: 30,
    color: '#424649',
  },
  modeSubText: {
    fontSize: 13,
    color: '#7B7B7B',
    paddingHorizontal: 40,
    paddingTop: 10,
    textAlign: 'center',
  },
  active: {
    elevation: 10,
  },

  ImageCardViewContainer: {
    backgroundColor: '#fff',
    height: 200,
    width: '100%',
    borderRadius: 15,
    position: 'relative',
    borderWidth: 0.3,
    borderColor: '#DEDEDE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.51,
    color: 'red',
    elevation: 1,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});
export default ImageCardView;
