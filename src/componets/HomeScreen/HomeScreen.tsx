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
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Heart from '../../../assets/svgImages/heart.svg';
import Beer from '../../../assets/svgImages/beer.svg';
import LinearGradient from 'react-native-linear-gradient';
import {GradientText} from '../GradientText/GradientText';
import Config from 'react-native-config';
import SplashScreen from 'react-native-splash-screen';
import {Section} from '../Section/Section';
import {AppButton} from '../AppButton/AppButton';
import {
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
} from '../../../helpers/showMessages';
import { styles } from './HomeScreenStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

export const HomeScreen = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => SplashScreen.hide(), []);
  const onPress = () => navigation.navigate('SignUp');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const envVar = Config.CUSTOM_VARIALE;
  const x = Config.X;
  const y = Config.Y;

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

            <GradientText
              colors={['#a80735', '#5b050c']}
              style={styles.gradientText}>
              I'm a first gradient text
            </GradientText>

            <Heart width={100} height={100} style={styles.image} />

            <Beer width={100} height={100} style={styles.image} />

            <Text style={styles.simpleText}>{envVar?.toUpperCase()}</Text>
            <Text style={styles.simpleText}>{`The value of x is ${x}`}</Text>
            <Text style={styles.simpleText}>{`The value of y is ${y}`}</Text>

            {x && y && (
              <Text style={styles.simpleText}>
                {`x + y = ${Number(x) + Number(y)}`}
              </Text>
            )}

            <AppButton onPress={onPress} title="Sign Up" />

            <AppButton title="Show info message" onPress={showInfoMessage} />
            <AppButton title="Show error message" onPress={showErrorMessage} />
            <AppButton
              title="Show success message"
              onPress={showSuccessMessage}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};