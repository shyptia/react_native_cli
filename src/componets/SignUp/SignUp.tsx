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

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Details'>;
};

export const SignUp = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => SplashScreen.hide(), []);

  const goBack = () => navigation.goBack();
  const signUp = () => console.log(password);

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
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <AppButton onPress={signUp} title="Sign Up" />
              <AppButton onPress={goBack} title="Go back" />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//     width: '100%',
//   },
//   button: {
//     backgroundColor: '#009688',
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
