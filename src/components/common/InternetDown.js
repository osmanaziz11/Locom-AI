/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { InternetIcon, NotFoundIcon } from 'src/assets/icons';
import { AppText } from '../ui';
import metrics from 'src/theme/metrics';

function InternetDown() {
  return (
    <View
      style={{
        width: '100%',
        height: metrics.screenHight - 200,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <InternetIcon width={200} height={200} color="#F6F6F6" />
      <AppText
        style={{
          fontSize: 20,
          color: '#C0C0C0',
          marginTop:30,
        }}
      >
        Something went wrong
      </AppText>
    </View>
  );
}

export default InternetDown;
