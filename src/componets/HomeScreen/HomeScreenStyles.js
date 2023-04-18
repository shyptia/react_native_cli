import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
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
