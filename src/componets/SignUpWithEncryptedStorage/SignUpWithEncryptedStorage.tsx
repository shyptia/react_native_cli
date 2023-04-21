/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './SignUpWithEncryptedStyles';
import LinearGradient from 'react-native-linear-gradient';
import {AppButton} from '../AppButton/AppButton';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import {UserData} from '../../../type/UserData';
import BottomSheet from 'react-native-bottomsheet';
import {observer} from 'mobx-react-lite';
import {todosStore} from '../../TodosStore';
import {TodosList} from '../TodosList/TodosList';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'SignUpWithEncryptedStorage'
  >;
};

export const SignUpWithEncryptedStorage = observer(({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [_, setSelectedItemId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const {todos, addTodo} = todosStore;

  console.log('render');

  const getData = async () => {
    try {
      const data = await EncryptedStorage.getItem('userData');

      if (data !== null) {
        const userData: UserData = JSON.parse(data);

        setUsername(userData.username);
        setSurname(userData.surname);
      }
    } catch (e) {
      console.log('Error occur');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onButtonPress = useCallback(() => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: ['BMW', 'Audi', 'Volvo'],
        title: 'Choose a car',
        dark: true,
        cancelButtonIndex: 3,
      },
      value => {
        setSelectedItemId(value);
      },
    );
  }, []);

  const handleAddTodo = useCallback(() => {
    const id = uuid().slice(0, 8);
    const newTodo = {id, title: todoTitle};
    addTodo(newTodo);
    setTodoTitle('');
  }, [todoTitle, addTodo]);

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
            <Text style={styles.text}>{`Hi, ${username} ${surname}`}</Text>

            <TextInput
              style={styles.input}
              placeholder="New todo"
              value={todoTitle}
              onChangeText={value => setTodoTitle(value)}
            />
            <Button title="Add todo" onPress={handleAddTodo} />

            {todos.length === 0 ? (
              <Text style={[styles.text, {marginVertical: 10}]}>
                There is no todos
              </Text>
            ) : (
              <TodosList todos={todos} />
            )}

            <AppButton title="Show bottomsheet" onPress={onButtonPress} />
            <AppButton
              title="Go to screen with animation"
              onPress={() => navigation.navigate('ScreenWithAnimation')}
            />
            <AppButton title="Go back" onPress={() => navigation.goBack()} />
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
