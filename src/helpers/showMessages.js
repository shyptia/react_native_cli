/* eslint-disable prettier/prettier */
import {showMessage, hideMessage} from 'react-native-flash-message';

export const showInfoMessage = () => showMessage({
  message: 'Info message',
  description: "It's simple info message that provide you information",
  type: 'info',
  onPress: () => hideMessage(),
});

export const showSuccessMessage = () => showMessage({
  message: 'Success message',
  description: 'Your data has been successfully saved to the storage',
  type: 'success',
  onPress: () => hideMessage(),
});

export const showErrorMessage = () => showMessage({
  message: 'Error message',
  description: 'Please enter valid values',
  type: 'danger',
  onPress: () => hideMessage(),
});
