/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import OptionCard from 'src/components/common/OptionCard';

const CompaignStats = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const options = [
    {
      id: 1,
      title: 'Total',
      text: 'Default',
      subtitle: 'Change your compaing name',
      path: '',
    },
    {
      id: 2,
      title: 'Customer',
      text: 'Default',
      subtitle: 'Change your compaing template',
      path: '',
    },
    {
      id: 3,
      title: 'Percentage',
      text: 'None',
      subtitle: 'Uploads your customer dataD',
      path: '',
    },
  ];

  return (
    <View style={[styles.parentContainer, { paddingTop: insets.top + 0 }]}>
      <View style={{ width: '100%' }}>
        <FlatList
          data={options}
          keyExtractor={(option) => option.id}
          renderItem={({ item: option }) => (
            <View style={{ paddingHorizontal: 5 }}>
              <OptionCard
                {...option}
                navigation={navigation}
                subtitle={option.subtitle}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'start',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  cardContainer: {
    width: '100%',
    marginBottom: 30,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default CompaignStats;
