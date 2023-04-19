/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/componets/HomeScreen/HomeScreen';
import {SignUp} from './src/componets/SignUp/SignUp';
import FlashMessage from 'react-native-flash-message';
import {SignUpWithAsyncStorage} from './src/componets/SignUpWithAsyncStorage/SignUpWithAsyncStorage';
import {SignUpWithEncryptedStorage} from './src/componets/SignUpWithEncryptedStorage/SignUpWithEncryptedStorage';

export type RootStackParamList = {
  HomeScreen: undefined;
  SignUp: undefined;
  SignUpWithAsyncStorage: undefined;
  SignUpWithEncryptedStorage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpWithAsyncStorage"
          component={SignUpWithAsyncStorage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpWithEncryptedStorage"
          component={SignUpWithEncryptedStorage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
