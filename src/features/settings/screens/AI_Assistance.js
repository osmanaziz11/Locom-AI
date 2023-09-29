/* eslint-disable prettier/prettier */

/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

import OptionCard from 'src/components/common/OptionCard';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import CustomModal from 'src/components/common/CustomModal';
import { useMutation } from '@tanstack/react-query';
import { VerifyNumber } from '../api/assistant';

const AssistanceScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [agent, setAgent] = useState({});
  const [modal, setModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);

  const { mutate, isError, isLoading, data } = useMutation(VerifyNumber);

  const options = [
    {
      id: 1,
      title: 'Assistant Modes',
      subtitle: 'Enable system notifications',
      path: 'assistant/modeScreen',
    },
    {
      id: 2,
      title: 'Virtual Numbers',
      subtitle: 'Purchase your virtual number',
      path: 'assistant/virtualNumberScreen',
    },
    {
      id: 3,
      title: 'Call Forwarding Number',
      subtitle: 'Enable your forwarding number',
      path: 'handler',
      handler: () => setModal(true),
    },
    {
      id: 4,
      title: 'Assistant Settings',
      subtitle: 'Train your assistant',
      text: '',
      path: 'assistant/settingScreen',
    },
    {
      id: 5,
      title: 'Assistant Conversations',
      subtitle: 'Check your assistant conversations',
      text: '',
      path: 'assistant/modeScreen',
    },
    {
      id: 6,
      title: 'Assistant Testing',
      subtitle: 'Test your assistant knowledge',
      text: '',
      path: 'assistant/testingScreen',
    },
  ];

  const getAgentInfo = async () => {
    const agentInfo = JSON.parse(await AsyncStorage.getItem('agent'));
    setAgent(agentInfo);
  };

  const modes = {
    1: 'Default',
    2: 'Robot',
    3: 'AI',
  };

  const optionText = (option) => {
    switch (option.id) {
      case 1:
        return modes[agent?.mode] || '';
      case 2:
        return agent.virtual_number !== null ? 'Configure' : '';
      case 3:
        return agent.forward_number !== null ? 'Configure' : '';
      default:
        return '';
    }
  };

  const handleToast = ({ title, subtitle }) => {
    Toast.show({
      type: ALERT_TYPE.WARNING,
      title: title,
      textBody: subtitle,
    });
  };
  const verifyPhoneNumber = () => {
    if (phoneNumber.length !== 0) {
      mutate(phoneNumber);
      setBtnLoader(true);
    }
  };

  const closeModal = () => {
    setPhoneNumber('');
    setBtnLoader(false);
    setModal(false);
  };

  useEffect(() => {
    getAgentInfo();
    return () => {};
  }, []);

  useEffect(() => {
    if (isError) {
      closeModal();
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Attention',
        textBody: 'Invalid phone number',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      closeModal();
      navigation.navigate('assistant/verification', {
        phoneNumber: phoneNumber,
        request_id: data,
      });
    }
  }, [data]);

  return (
    <View style={[styles.parentContainer, { paddingTop: insets.top + 0 }]}>
      <CustomModal
        type="input"
        title="Enter Business Number"
        subtitle="Calls will be forwarded to this number"
        isOpen={modal}
        action={{
          type: 'double',
          primaryText: 'Cancel',
          primaryHandler: closeModal,
          secondaryText: 'Confirm',
          secondaryHandler: verifyPhoneNumber,
          loader: btnLoader,
        }}
        handleInput={setPhoneNumber}
      />
      <View style={{ width: '100%' }}>
        <FlatList
          data={options}
          keyExtractor={(option) => option.id}
          renderItem={({ item: option }) => (
            <View style={{ paddingHorizontal: 5 }}>
              <OptionCard
                {...option}
                text={optionText(option)}
                toast={handleToast}
                navigation={navigation}
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

export default AssistanceScreen;

// <Modal visible={false} animationType="fade" transparent={true}>
// <View
//   style={{
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     paddingHorizontal: 10,
//   }}
// >
//   <View
//     style={{
//       position: 'relative',
//       backgroundColor: 'white',
//       padding: 20,
//       borderRadius: 10,
//       elevation: 5,
//       width: '90%',
//     }}
//   >
//     <View
//       style={{
//         display: 'none',
//         position: 'absolute',
//         top: -15,
//         borderRadius: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//         right: -5,
//         width: 40,
//         height: 40,
//         backgroundColor: 'white',
//         elevation: 10,
//       }}
//     >
//       <CrossIcon color="black" />
//     </View>
//     <AppText style={{ fontSize: 18, marginBottom: 4 }}>
//       Enter Business Number
//     </AppText>
//     <AppText
//       style={{
//         fontSize: 13,
//         marginBottom: 20,
//         paddingTop: 0,
//         fontWeight: 'light',
//         color: 'rgba(23, 23, 33, 0.7)',
//       }}
//     >
//       Calls will be forwarded to this number
//     </AppText>
//     <TextInput
//       style={{
//         borderWidth: 0.5,
//         borderColor: 'gray',
//         padding: 5,
//         paddingHorizontal: 8,
//         marginBottom: 2,
//         borderRadius: 4,
//       }}
//       placeholder="xx xxx xxx xxx"
//       keyboardType="phone-pad"

//       // onChangeText={(text) => setPhoneNumber(text)}
//     />
//     <TouchableWithoutFeedback
//       onPress={() => navigation.navigate('assistant/modeScreen')}
//       style={{
//         height: 35,
//         width: '100%',
//         backgroundColor: 'black',
//         borderRadius: 10,
//         marginTop: 10,
//       }}
//     >
//       <Button
//         title="Confirm"
//         color="black"
//         onPress={() => navigation.navigate('assistant/verification')}
//       />
//     </TouchableWithoutFeedback>
//   </View>
// </View>
// </Modal>
