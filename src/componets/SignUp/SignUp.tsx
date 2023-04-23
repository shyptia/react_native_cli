/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {CopilotStep, useCopilot} from 'react-native-copilot';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {AppButton} from '../AppButton/AppButton';
import { styles } from './SignUpStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { showErrorMessage, showSuccessMessage } from '../../../helpers/showMessages';
import { RootStackParamList } from '../../../App';
import { storeData } from '../../../helpers/storeDataInAsyncStorage';
import { storeUserData } from '../../../helpers/storeDataWithEncryptedStorage';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const rnBiometrics = new ReactNativeBiometrics();

export const SignUp = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const {start} = useCopilot();

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const signUpWithAsyncStorage = useCallback(() => {
    if (!username || !surname) {
      showErrorMessage();
      return;
    }

    storeData('username', username);
    storeData('surname', surname);
    showSuccessMessage();
    navigation.navigate('SignUpWithAsyncStorage');
  }, [surname, username, navigation]);

  const signUpWithEncryptedStorage = useCallback(() => {
    if (!username || !surname) {
      showErrorMessage();
      return;
    }

    const userData = { username, surname };
    storeUserData('userData', userData);
    showSuccessMessage();
    navigation.navigate('SignUpWithEncryptedStorage');
  }, [username, surname, navigation]);

  const isBiometricSupport = async () => {
    let {available, biometryType} = await rnBiometrics.isSensorAvailable();

    console.log({available, biometryType});

    if (available && biometryType === BiometryTypes.Biometrics) {
      setIsBiometricAvailable(true);
    }
  };

  const handleBiometricAuth = async () => {
    if (!isBiometricAvailable) {
      return;
    }

    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Scan your fingerprint to authenticate.',
        cancelButtonText: 'Close',
      });

      if (success) {
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isBiometricSupport();
  }, []);

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

            <CopilotStep
              text="You can sign in with async storage"
              order={1}
              name="AsyncStorage"
            >
              <AppButton onPress={signUpWithAsyncStorage} title="Sign up with async storage" />
            </CopilotStep>

            <CopilotStep
              text="You can sign in with encrypted storage"
              order={2}
              name="EncryptedStorage"
            >
              <AppButton onPress={signUpWithEncryptedStorage} title="Sign up with encrypted storage" />
            </CopilotStep>

            <CopilotStep
              text="You can sign in with biometrics"
              order={3}
              name="Biometrics"
            >
              <AppButton onPress={handleBiometricAuth} title="Sign with biometrics" />
            </CopilotStep>

            <AppButton onPress={() => start()} title="Start tutorial" />
            <AppButton onPress={goBack} title="Go back" />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
