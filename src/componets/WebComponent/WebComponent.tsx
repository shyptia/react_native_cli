/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {styles, tagsStyles} from './WebComponentStyles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RenderHtml from 'react-native-render-html';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppButton} from '../AppButton/AppButton';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WebComponent'>;
}

const customHTML = {
  html: `
    <body>
      <h1 id="h1_element">
        This is simple html
      </h1>
      <h2 id="h2_element">
        This text will be changed later!
      </h2>
    </body>
  `,
};

export const WebComponent: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();

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
          <RenderHtml
            contentWidth={width}
            source={customHTML}
            tagsStyles={tagsStyles}
          />

          <AppButton title="Go back" onPress={() => navigation.goBack()} />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
