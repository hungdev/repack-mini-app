import {View, Text, Button} from 'react-native';
import React from 'react';

import {
  useAppDispatch,
  useAppSelector,
  getReducers,
} from 'RepackHostApp/SharedRedux';
import {addTodo} from '../store/todoSlice';

export default function Me() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos?.list || []);
  const user = useAppSelector(state => state.user.name);
  console.log('user', user);

  const handleRemoveTodo = () => {
    dispatch(addTodo('cee'));
  };
  return (
    <View>
      <Text>Me</Text>
      {todos.map((todo, index) => (
        <Text key={index} style={{fontSize: 16, marginVertical: 4}}>
          {todo.text} - {todo.completed ? 'Completed' : 'Pending'}
        </Text>
      ))}
      <Button title="Add" color="blue" onPress={() => handleRemoveTodo()} />
      <Button
        title="getReducers"
        onPress={() => {
          console.log('getReducers', getReducers());
        }}
      />
    </View>
  );
}
