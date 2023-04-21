import React from 'react';
import {View, Text} from 'react-native';
import {Todo} from '../../../type/Todo';
import {styles} from './TodoListStyles';

interface Props {
  todos: Todo[];
}

export const TodosList: React.FC<Props> = ({todos}) => {
  return (
    <View style={styles.container}>
      {todos.map(todo => (
        <Text style={styles.item} key={todo.id}>
          {todo.title.toUpperCase()}
        </Text>
      ))}
    </View>
  );
};
