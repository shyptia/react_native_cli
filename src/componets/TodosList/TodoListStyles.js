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
    paddingVertical: 20,
  },
  text: {
    padding: 5,
    fontFamily: 'Montserrat',
    fontSize: 18,
  },
  taskTitle: {
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    textAlign: 'center',
    elevation: 4,
  },
});
