import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addTodo} from '../store/todoSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Me() {
  // const [sharedRedux, setSharedRedux] = useState(null);

  // useEffect(() => {
  //   const loadSharedRedux = async () => {
  //     const module = await import('RepackHostApp/SharedRedux');
  //     setSharedRedux(module);
  //   };
  //   loadSharedRedux();
  // }, []);

  // if (!sharedRedux) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  const dispatch = useDispatch();
  const todos = useSelector(state => state.miniApp?.todos?.list || []);
  const user = useSelector(state => state.miniApp?.user.name);
  console.log('user', user);

  const handleRemoveTodo = () => {
    dispatch(addTodo('hello cee'));
  };
  return (
    <View>
      <Text>Me: {JSON.stringify(user)}</Text>
      {todos.map((todo, index) => (
        <Text key={index} style={{fontSize: 16, marginVertical: 4}}>
          {todo.text} - {todo.completed ? 'Completed' : 'Pending'}
        </Text>
      ))}
      <Button title="Add" color="blue" onPress={() => handleRemoveTodo()} />
      <Button
        title="getReducers"
        onPress={() => {
          // console.log('getReducers', sharedRedux.getReducers());
        }}
      />
    </View>
  );
}
