/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ImagedCardView from 'src/components/common/ImageCardView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

function Modes() {
  const [agentMode, setMode] = useState(1);
  const [loader, setLoader] = useState(-1);
  const [isDisabled, setDisabled] = useState(false);
  const modes = [
    {
      id: 1,
      title: 'HUMNOID',
      subtitle:
        'This approach emulates the effect of a radial gradient background without using external libraries in React Native.',
    },
    {
      id: 2,
      title: 'ROBOT',
      subtitle:
        'This approach emulates the effect of a radial gradient background without using external libraries in React Native.',
    },
    {
      id: 3,
      title: 'AI',
      subtitle:
        'This approach emulates the effect of a radial gradient background without using external libraries in React Native.',
    },
  ];

  const getAgent = async () => {
    const agent = JSON.parse(await AsyncStorage.getItem('agent'));
    agent?.mode !== 1 && setMode(agent?.mode);
  };

  const handleClick = async (value) => {
    if (value === agentMode) {
      return '';
    }

    setLoader(value);
    setDisabled(true);

    const agent = JSON.parse(await AsyncStorage.getItem('agent'));

    if (agent.virtual_number && agent.forward_number !== null) {
      return '';
    }

    let textBody = '';

    if (agent.forward_number === null && agent.virtual_number === null) {
      textBody = 'virtual and forward number';
    } else if (agent.forward_number !== null && agent.virtual_number === null) {
      textBody = 'Virtual number';
    } else {
      textBody = 'Forward number';
    }

    setTimeout(() => {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Alert',
        textBody: `Please configure ${textBody}`,
        button: 'close',
        theme: 'dark',
      });

      setLoader(-1);
      setDisabled(false);
    }, 1000);
  };


  useEffect(() => {
    getAgent();
  }, []);

  return (
    <View style={[styles.parentContainer]}>
      <View style={{ width: '100%' }}>
        <FlatList
          data={modes}
          keyExtractor={(option) => option.id}
          renderItem={({ item: option }) => (
            <View style={{ paddingHorizontal: 15 }}>
              <ImagedCardView
                {...option}
                active={agentMode === option.id ? true : false}
                loader={loader}
                disabled={isDisabled}
                handleClick={handleClick}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    alignItems: 'start',
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
});
export default Modes;
