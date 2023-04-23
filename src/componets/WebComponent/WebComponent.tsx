/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {styles} from './WebComponentStyles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppButton} from '../AppButton/AppButton';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WebComponent'>;
}

const customHTML = `
  <body style="display:flex; flex-direction: column;justify-content: center; 
    align-items:center; color:black; height: 100%;">
    <h1 
      style="font-size:80px; padding: 20px; text-align: center;" 
      id="h1_element"
    >
      This is simple html
    </h1>

    <h2 
      style="display: block; font-size:60px; padding: 30px; text-align: center;"
      id="h2_element"
    >
      This text will be changed later!
    </h2>
  </body>
`;

export const WebComponent: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.flex]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={{flexGrow: 1}}>
        <LinearGradient
          colors={['#f2cc7b', '#cc420a']}
          style={styles.linearGradient}>
          {/* <WebView source={{uri: 'https://reactnative.dev/'}} /> */}

          <WebView
            style={{backgroundColor: 'transparent'}}
            source={{html: customHTML}}
          />
          <AppButton title="Go back" onPress={() => navigation.goBack()} />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
