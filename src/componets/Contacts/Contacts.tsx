/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppButton} from '../AppButton/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './ContactsStyles';
import Contacts, {Contact} from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {showErrorMessage} from '../../../helpers/showMessages';

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ContactsComponent'
  >;
}

const checkPermission = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
  })
    .then(res => {
      console.log('Permission: ', res);

      Contacts.getAll()
        .then(contacts => {
          console.log(contacts);
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch(error => {
      console.error('Permission error: ', error);
    });
};

export const ContactsComponent: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    checkPermission();
  }, []);

  const addNewContact = () => {
    if (!name || !surname || !email) {
      showErrorMessage();
      return;
    }

    const newContact: Contact = {
      emailAddresses: [{label: 'work', email: 'mrniet@example.com'}],
      phoneNumbers: [{label: 'mobile', number: '4378859435'}],
      familyName: surname,
      givenName: name,
      recordID: '',
      backTitle: '',
      company: null,
      displayName: name + ' ' + surname,
      middleName: '',
      jobTitle: '',
      hasThumbnail: false,
      thumbnailPath: '',
      isStarred: false,
      postalAddresses: [],
      prefix: '',
      suffix: '',
      department: '',
      birthday: {year: 1988, month: 1, day: 1},
      imAddresses: [],
      note: '',
    };

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to write new contact.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);

        Contacts.openContactForm(newContact)
          .then(() => {
            console.log('Contact was added');
            setName('');
            setSurname('');
            setEmail('');
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };

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
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={value => setName(value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Surname"
              value={surname}
              onChangeText={value => setSurname(value)}
            />
          </View>

          <TextInput
            style={[styles.input, {width: '100%'}]}
            placeholder="Email"
            value={email}
            onChangeText={value => setEmail(value)}
          />

          <AppButton title="Add new contact" onPress={addNewContact} />

          <AppButton title="Go back" onPress={() => navigation.goBack()} />
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
