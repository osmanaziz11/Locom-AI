import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {TAB_BAR_HEIGHT} from 'src/config';
import { Button } from 'src/components/ui';


const MembersScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {paddingBottom: TAB_BAR_HEIGHT + 15 + insets.bottom + 16},
      ]}>
      <View style={{flex: 1}} />
      <Button onPress={() => navigation.navigate('MemberCreate')}>
        Add new team member
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});

export default MembersScreen;
