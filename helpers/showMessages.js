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
  description: 'You have successfully registered',
  type: 'success',
  onPress: () => hideMessage(),
});

export const showErrorMessage = () => showMessage({
  message: 'Error message',
  description: 'Something went wrong',
  type: 'danger',
  onPress: () => hideMessage(),
});
