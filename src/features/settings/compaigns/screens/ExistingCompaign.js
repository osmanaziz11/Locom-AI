/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import OptionCard from 'src/components/common/OptionCard';

const ExistingCompaing = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const options = [
    {
      id: 1,
      title: 'Compaign 1',
      text: '',
      subtitle: '',
      path: '',
    },
    {
      id: 2,
      title: 'Compaign 2',
      text: '',
      subtitle: '',
      path: '',
    },
    {
      id: 3,
      title: 'Compaign 3',
      text: '',
      subtitle: '',
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

export default ExistingCompaing;
