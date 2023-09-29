/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { NotFoundIcon } from 'src/assets/icons';
import { AppText } from '../ui';
import metrics from 'src/theme/metrics';

function NotAvailable() {
  return (
    <View
      style={{
        width: '100%',
        height: metrics.screenHight - 190,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NotFoundIcon width={250} height={250} color="#F6F6F6" />
      <AppText
        style={{
          fontSize: 20,
          color: '#C0C0C0',
        }}
      >
        Not Available
      </AppText>
    </View>
  );
}

export default NotAvailable;
