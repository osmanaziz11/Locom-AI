/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
  BusinessIcon,
  LogoutIcon,
  OpenAIIcon,
  ProfileIcon,
} from 'src/assets/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileImage from 'src/components/common/ProfileImage';
import { AppText } from 'src/components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexedScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [, setIsAutomated] = useState(false);
  const [isAgent, setAgent] = useState(false);

  const user = useSelector(({ $auth }) => $auth.user);

  const handleChangeAutomated = (value) => {
    setIsAutomated(value);
  };

  const checkAgent = async () => {
    const status = await AsyncStorage.getItem('AI_AGENT');
    if (status) {
      setAgent(true);
    }
  };

  useEffect(() => {
    checkAgent();
  }, []);

  return (
    <View style={[styles.parentContainer, { paddingTop: insets.top + 59 }]}>
      <ProfileImage size={105} uri={user.picture} style={{ marginBottom: 8 }} />
      <AppText size={22}>
        {user.firstname} {user.lastname}
      </AppText>
      <AppText color="#8083A3" size={14} weight={400}>
        {user.email}
      </AppText>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <ProfileIcon style={{ marginRight: 11 }} />
          <AppText>Account information</AppText>
        </View>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate(
              `${isAgent ? 'assistance' : 'assistance/onboarding'}`
            )
          }
        >
          <OpenAIIcon style={{ marginRight: 11 }} />
          <AppText>AI-Powered Assistance</AppText>
        </TouchableOpacity>

        <View style={styles.card}>
          <BusinessIcon style={{ marginRight: 11 }} />
          <AppText>Monitor Google Business profile</AppText>
        </View>
        <View style={styles.card}>
          <BusinessIcon style={{ marginRight: 11 }} />
          <AppText>Campaigns</AppText>
        </View>
        <View style={styles.card}>
          <BusinessIcon style={{ marginRight: 11 }} />
          <AppText>AI automated review responses</AppText>
          {/* <Switch active={isAutomated} onChange={handleChangeAutomated} /> */}
        </View>

        <View style={styles.row} />
      </View>

      <View style={styles.logoutBtn}>
        <LogoutIcon color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    position: 'absolute',
    top: '3%',
    right: '8%',
    width: 50,
    height: 50,
    borderRadius: 40,

    paddingLeft: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: '#fff',
    shadowOpacity: 0.51,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  cardContainer: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    height: 56,
    width: '100%',
    borderRadius: 14,
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
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingStart: 10,
    paddingEnd: 10,
  },
});

export default IndexedScreen;
