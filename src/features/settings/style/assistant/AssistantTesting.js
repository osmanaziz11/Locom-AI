/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

export const assistantTestingStyle = StyleSheet.create({
  parentContainer: {
    height: '100%',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  onlineDot: {
    width: 20,
    height: 20,
    backgroundColor: '#00B15F',
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  offlineDot: {
    width: 20,
    height: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 50,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  chatContainer: {
    height: '80%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  inputFieldStyle:{
    backgroundColor: 'white',
    width: '90%',
    borderColor: 'gray',
    borderRadius: 2,
    paddingLeft: 10,
    height: 50,
  },
});
