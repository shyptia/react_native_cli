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
    marginBottom: 15,
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
