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
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Heart from './assets/svgImages/heart.svg';
import Beer from './assets/svgImages/beer.svg';
import LinearGradient from 'react-native-linear-gradient';
import {GradientText} from './src/componets/GradientText/GradientText';
import Config from 'react-native-config';
import SplashScreen from 'react-native-splash-screen';
import {Section} from './src/componets/Section/Section';
import FlashMessage from 'react-native-flash-message';
import {AppButton} from './src/componets/AppButton/AppButton';
import {
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
} from './helpers/showMessages';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => SplashScreen.hide(), []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const envVar = Config.CUSTOM_VARIALE;
  const x = Config.X;
  const y = Config.Y;

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

            <AppButton title="Show info message" onPress={showInfoMessage} />
            <AppButton title="Show error message" onPress={showErrorMessage} />
            <AppButton
              title="Show success message"
              onPress={showSuccessMessage}
            />
          </LinearGradient>

          <FlashMessage position="top" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    height: '100%',
    backgroundColor: Colors.white,
    alignContent: 'center',
  },
  image: {
    marginBottom: 10,
    marginLeft: 24,
  },
  linearGradient: {
    flex: 1,
  },
  gradientText: {
    marginBottom: 15,
    fontFamily: 'Montserrat',
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  simpleText: {
    marginBottom: 10,
    marginLeft: 24,
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    marginBottom: 10,
  },
});

export default App;
