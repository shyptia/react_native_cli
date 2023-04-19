/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {AppButton} from '../AppButton/AppButton';
import { styles } from './SignUpStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { showErrorMessage, showSuccessMessage } from '../../../helpers/showMessages';
import { RootStackParamList } from '../../../App';
import { storeData } from '../../../helpers/storeDataInAsyncStorage';
import { storeUserData } from '../../../helpers/storeDataWithEncryptedStorage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

export const SignUp = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => SplashScreen.hide(), []);

  const goBack = () => navigation.goBack();

  const signUpWithAsyncStorage = () => {
    if (!username || !surname) {
      showErrorMessage();
      return;
    }

    storeData('username', username);
    storeData('surname', surname);
    showSuccessMessage();
    navigation.navigate('SignUpWithAsyncStorage');
  };

  const signUpWithEncryptedStorage = () => {
    if (!username || !surname) {
      showErrorMessage();
      return;
    }

    const userData = { username, surname };
    storeUserData('userData', userData);
    showSuccessMessage();
    navigation.navigate('SignUpWithEncryptedStorage');
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.viewContent}>
          <LinearGradient
            colors={['#f2cc7b', '#cc420a']}
            style={styles.linearGradient}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={username}
              onChangeText={(name) => setUsername(name)}
            />

            <TextInput
              style={styles.input}
              placeholder="Surname"
              value={surname}
              onChangeText={(text) => setSurname(text)}
            />

            <AppButton onPress={signUpWithAsyncStorage} title="Sign up with async storage" />
            <AppButton onPress={signUpWithEncryptedStorage} title="Sign up with encrypted storage" />
            <AppButton onPress={goBack} title="Go back" />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
