/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import {SecondScreen} from './src/componets/SecondScreen';

Navigation.registerComponent('WelcomeScreen', () => App);
Navigation.registerComponent('SecondScreen', () => SecondScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'WelcomeScreen',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
});
