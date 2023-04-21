import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  viewContent: {
    height: '100%',
    backgroundColor: Colors.white,
    alignContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    marginBottom: 15,
    backgroundColor: 'green',
  },
  circle: {
    width: 100,
    height: 100,
    marginBottom: 15,
    color: 'red',
    borderRadius: 50,
  },
});
