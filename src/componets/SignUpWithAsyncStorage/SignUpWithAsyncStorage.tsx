/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './SignUpWithAsyncStorageStyles';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppButton} from '../AppButton/AppButton';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'SignUpWithAsyncStorage'
  >;
};

export const SignUpWithAsyncStorage = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [location, setLocation] = useState<GeolocationResponse | null>(null);

  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem('username');
      const secondName = await AsyncStorage.getItem('surname');

      if (name !== null) {
        setUsername(name);
      }

      if (secondName !== null) {
        setSurname(secondName);
      }
    } catch (e) {
      console.log('Error occur');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(position => {
      setLocation(position);
    });
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.viewContent}>
          <LinearGradient
            colors={['#f2cc7b', '#cc420a']}
            style={styles.linearGradient}>
            <Text style={styles.text}>{`Hi, ${username} ${surname}`}</Text>

            <AppButton
              title="Open camera"
              onPress={() => navigation.navigate('Camera')}
            />

            <AppButton
              title="Go to WebComponent"
              onPress={() => navigation.navigate('WebComponent')}
            />

            <AppButton title="Get location" onPress={getLocation} />

            {location && (
              <View>
                <Text style={styles.text}>
                  {'Latitude: ' + location.coords.latitude}
                </Text>
                <Text style={styles.text}>
                  {'Longitude: ' + location.coords.longitude}
                </Text>
              </View>
            )}

            <AppButton title="Go back" onPress={() => navigation.goBack()} />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
