/* eslint-disable prettier/prettier */

import { StyleSheet } from 'react-native';

export const customModalStyle = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
  },
  modalContainer: {
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '90%',
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  btn: {
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  alertTitle: { fontSize: 18, marginBottom: 4, textAlign: 'center' },
  alertSubtitle: {
    fontSize: 13,
    marginTop: 10,
    paddingTop: 0,
    fontWeight: 'light',
    color: 'rgba(23, 23, 33, 0.7)',
    textAlign: 'center',
  },
  inputTitle: { fontSize: 18, marginBottom: 4 },
  inputSubtitle: {
    fontSize: 13,
    marginTop: 0,
    marginBottom: 15,
    paddingTop: 0,
    fontWeight: 'light',
    color: 'rgba(23, 23, 33, 0.7)',
    textAlign: 'left',
  },
  inputField: {
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 5,
    paddingHorizontal: 8,
    marginBottom: 2,
    borderRadius: 4,
  },
  btnCancel: {
    backgroundColor: 'rgba(23, 23, 33, 0.1)',
  },
  btnConfirm: {
    backgroundColor: 'black',
  },
  confirmText:{
    color:'white',
  },
  cancelText:{
    color:'black',
  },
});
