/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  View,
  FlatList,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';
import {Todo} from '../../../type/Todo';
import {styles} from './TodoListStyles';
import {Item} from '../ListItem/ListItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {todosStore} from '../../TodosStore';
import {v4 as uuid} from 'uuid';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {AppButton} from '../AppButton/AppButton';
import {observer} from 'mobx-react-lite';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TodosList'>;
};

export const TodosList: React.FC<Props> = observer(({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todoTitle, setTodoTitle] = useState('');
  const {todos, addTodo} = todosStore;

  const handleAddTodo = useCallback(() => {
    const id = uuid().slice(0, 8);
    const newTodo = {id, title: todoTitle};
    addTodo(newTodo);
    setTodoTitle('');
  }, [todoTitle, addTodo]);

  const renderItem = ({item}: {item: Todo}) => <Item title={item.title} />;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.viewContent}>
        <LinearGradient
          colors={['#f2cc7b', '#cc420a']}
          style={styles.linearGradient}>
          <TextInput
            style={styles.input}
            placeholder="New todo"
            value={todoTitle}
            onChangeText={value => setTodoTitle(value)}
          />
          <AppButton title="Add todo" onPress={handleAddTodo} />

          {todos.length === 0 ? (
            <Text style={[styles.text, {marginVertical: 10}]}>
              There is no todos
            </Text>
          ) : (
            <FlatList
              data={todos}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          )}

          <AppButton title="Go back" onPress={() => navigation.goBack()} />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
});
