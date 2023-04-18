/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Heart from './assets/svgImages/heart.svg';
import Beer from './assets/svgImages/beer.svg';
import LinearGradient from 'react-native-linear-gradient';
import {GradientText} from './src/componets/GradientText';
import {Section} from './src/componets/Section';
import {AppButton} from './src/componets/AppButton';
import {Navigation} from 'react-native-navigation';

interface Props {
  componentId: string;
}

function App(props: Props): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = () =>
    Navigation.push(props.componentId, {
      component: {
        name: 'SecondScreen',
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    });

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

            <AppButton onPress={onPress} title="Go to the second screen" />
          </LinearGradient>
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
});

export default App;
