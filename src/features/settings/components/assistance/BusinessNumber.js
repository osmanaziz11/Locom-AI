/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Skeleton } from 'react-native-skeleton-loaders';
import { CountryPicker } from 'react-native-country-codes-picker';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from 'src/components/ui';
import { VirtualFakeNumbers } from 'src/utils';
import {
  GetNumbers,
  PurchaseNumber,
} from 'src/features/settings/api/assistant';
import NotAvailable from 'src/components/common/NotAvailable';
import { useMutation } from '@tanstack/react-query';
import InternetDown from 'src/components/common/InternetDown';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ActivityIndicator } from 'react-native';
import CustomModal from 'src/components/common/CustomModal';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BusinessNumberScreen({ navigation }) {
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState({});
  const [modal, setModal] = useState(false);
  const [number, setNumber] = useState({});
  const [isDisabled, setDisabled] = useState(false);
  const [isActive, setActive] = useState(false);

  const user = useSelector(({ $auth }) => $auth.user);

  const {
    mutate: getNumbersMutate,
    isLoading: getNumbersIsLoading,
    isError: getNumbersIsError,
    data: getNumbersData,
  } = useMutation(GetNumbers);

  const {
    mutate: purchaseNumberMutate,
    isError: purchaseNumberIsError,
    data: purchaseNumberData,
  } = useMutation(PurchaseNumber);

  const handleCountryPicker = (props) => {
    setShow(false);
    setCountry(props);
    getNumbersMutate(props.code);
  };

  const handleClick = (item) => {
    setNumber({ msisdn: item.msisdn, country: item.country });
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handlePurchase = () => {
    setModal(false);
    setActive(true);
    setDisabled(true);
    purchaseNumberMutate(number);
  };

  const updateFirestore = async () => {
    const agentRef = firestore().collection('agents').doc(user?.id);
    try {
      await agentRef.update({
        virtual_number: `${number.msisdn}`,
      });
      return true;
    } catch (error) {
      console.error('Error updating Firestore cache:', error);
      return false;
    }
  };

  const updateAsyncStorage = async () => {
    try {
      const agentCache = JSON.parse(await AsyncStorage.getItem('agent'));
      agentCache.virtual_number = number.msisdn;
      await AsyncStorage.setItem('agent', JSON.stringify(agentCache));
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  };

  const showSuccessDialog = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Alert',
      textBody: 'Congratulations. You have successfully completed the purchase',
      button: 'close',
      theme: 'dark',
      onPressButton: () => {
        navigation.navigate('assistant/home');
        Dialog.hide();
      },
    });
  };

  const showErrorDialog = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Something went wrong',
      button: 'close',
      theme: 'dark',
      onPressButton: () => {
        Dialog.hide();
        setActive(false);
        setDisabled(false);
      },
    });
  };

  const updateFS_CACHE = async () => {
    try {
      const firestoreSuccess = await updateFirestore();
      if (firestoreSuccess) {
        await updateAsyncStorage();
        showSuccessDialog();
      } else {
        showErrorDialog();
      }
    } catch (error) {
      console.error('Error in updateFS_CACHE:', error);
      showErrorDialog();
    }
  };

  useEffect(() => {
    if (purchaseNumberIsError) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Alert',
        textBody: 'Something went wrong',
        button: 'close',
        theme: 'dark',
        onPressButton: () => {
          Dialog.hide();
          setActive(false);
          setDisabled(false);
        },
      });
    }
  }, [purchaseNumberIsError]);

  useEffect(() => {
    if (purchaseNumberData) {
      updateFS_CACHE();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseNumberData]);

  const modalProps = {
    type: 'alert',
    isOpen: modal,
    title: 'Alert',
    subtitle: 'Please choose number wiesely. You cannot purchase number again',
    action: {
      type: 'double',
      primaryText: 'Cancel',
      secondaryText: 'Confirm',
      primaryHandler: closeModal,
      secondaryHandler: handlePurchase,
    },
  };

  useEffect(() => {
    getNumbersMutate('AF');
  }, []);

  return (
    <View style={styles.pickerContainer}>
      <CustomModal {...modalProps} />
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.countryPickerBtn}
      >
        <View style={{ flexDirection: 'row' }}>
          <AppText
            style={{
              color: 'rgba(23, 23, 33, 0.6)',
              fontSize: 15,
              marginRight: 10,
            }}
          >
            {!Object.keys(country).length > 0 && '🇦🇫'}
            {country.flag}
          </AppText>
          <AppText
            style={{
              color: 'rgba(23, 23, 33, 0.6)',
              fontSize: 15,
            }}
          >
            {!Object.keys(country).length > 0 && '+93'}
            {country?.dial_code}
          </AppText>
        </View>

        <AppText
          style={{
            color: 'rgba(23, 23, 33, 0.6)',
            fontSize: 15,
          }}
        >
          {!Object.keys(country).length > 0 && 'Afghanistan'}
          {country?.name?.en}
        </AppText>
      </TouchableOpacity>

      <CountryPicker
        show={show}
        onBackdropPress={() => setShow(false)}
        pickerButtonOnPress={handleCountryPicker}
        style={styles.picker}
      />

      <View style={{ height: 800, backgroundColor: 'white' }}>
        {getNumbersIsError ? (
          <InternetDown />
        ) : getNumbersIsLoading ? (
          <FlatList
            data={VirtualFakeNumbers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listSkele}>
                <Skeleton w={200} h={30} speed={700} />
                <Skeleton w={50} h={30} speed={700} />
              </View>
            )}
          />
        ) : getNumbersData && Object.keys(getNumbersData).length === 0 ? (
          <NotAvailable />
        ) : (
          <FlatList
            data={getNumbersData?.numbers}
            keyExtractor={(item) => item.msisdn}
            renderItem={({ item }) => (
              <TouchableOpacity
                disabled={isDisabled}
                onPress={() => handleClick(item)}
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: 'white',
                  padding: 10,
                  borderBottomWidth: 0.2,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <AppText
                  style={{
                    color: 'rgba(23, 23, 33, 0.6)',

                    marginRight: 10,
                  }}
                >
                  {item.msisdn}
                </AppText>

                {number?.msisdn === item.msisdn && isActive ? (
                  <ActivityIndicator
                    size="small"
                    color="rgba(23, 23, 33, 0.6)"
                  />
                ) : (
                  <AppText
                    style={{
                      color: 'rgba(23, 23, 33, 0.6)',

                      marginRight: 10,
                    }}
                  >
                    Free
                  </AppText>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listSkele: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    // Styles for whole modal [View]
    modal: {
      height: 400,
    },
    // Styles for modal backdrop [View]
    backdrop: {},
    // Styles for bottom input line [View]
    line: {},
    // Styles for list of countries [FlatList]
    itemsList: {
      height: 50,
    },
    // Styles for input [TextInput]
    textInput: {
      height: 50,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    // Styles for country button [TouchableOpacity]
    countryButtonStyles: {
      height: 50,
    },
    // Styles for search message [Text]
    searchMessageText: {},
    // Styles for search message container [View]
    countryMessageContainer: {},
    // Flag styles [Text]
    flag: {},
    // Dial code styles [Text]
    dialCode: {},
    // Country name styles [Text]
    countryName: {},
  },
  countryPickerBtn: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2,
  },
  pickerContainer: {
    height: 70,
  },
  loaderOverlay: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
