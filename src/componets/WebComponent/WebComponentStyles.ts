import {StyleSheet} from 'react-native';
import {MixedStyleDeclaration} from 'react-native-render-html';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export const tagsStyles: Readonly<{[key: string]: MixedStyleDeclaration}> = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    height: '100%;',
    textAlign: 'center',
  },
  h1: {
    padding: 20,
    fontSize: 60,
  },
  h2: {
    padding: 30,
    fontSize: 40,
  },
};
