/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {Section} from '../Section/Section';
import {AppButton} from '../AppButton/AppButton';
import { styles } from './HomeScreenStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { getDeviceInfo } from '../../helpers/getDeviceInfo';
import NetInfo from '@react-native-community/netinfo';
import { chechWifiConnection, checkCellularConnection } from '../../helpers/checkInternetConnection';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

export const HomeScreen = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
    getDeviceInfo();

    const removeNetInfoSubscription = NetInfo.addEventListener(networkState => {
      if (!networkState.isConnected) {
        console.log('You are not connected');
        return;
      }

      if (networkState.type === 'wifi') {
        chechWifiConnection(networkState);
      }

      if (networkState.type === 'cellular') {
        checkCellularConnection(networkState);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);
  const onPress = () => navigation.navigate('SignUp');

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
            <Section title="It's my first React Native project" />

            <AppButton onPress={onPress} title="Sign Up" />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
