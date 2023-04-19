import EncryptedStorage from 'react-native-encrypted-storage';
import {UserData} from '../type/UserData';

export const storeUserData = async (key: string, value: UserData) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error occur');
  }
};
