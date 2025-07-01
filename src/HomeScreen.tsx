import React, {useEffect, useMemo} from 'react';
import {View, Text, Button, FlatList, Alert, TextInput} from 'react-native';
// Import từ host module
import {
  removeReducer,
  useAppSelector,
  useAppDispatch,
  getReducerNames,
  type RootState,
} from 'RepackHostApp/SharedRedux';
// Import slice sẽ tự động add reducer
import '../store/todoSlice';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  clearCompleted,
  type TodoItem,
  type TodoState,
} from '../store/todoSlice';

export const TodoScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [newTodoText, setNewTodoText] = React.useState('');

  // Type-safe selectors
  const todos = useAppSelector((state: any) => state.todos?.list || []);
  const filter = useAppSelector(
    (state: any) => (state.todos as TodoState)?.filter || 'all',
  );
  const loading = useAppSelector(
    (state: any) => (state.todos as TodoState)?.loading || false,
  );
  const user = useAppSelector((state: any) => state.user);

  // Filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo: any) => todo.completed);
      case 'pending':
        return todos.filter((todo: any) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Cleanup khi unmount (optional)
  useEffect(() => {
    return () => {
      removeReducer('todos');
    };
  }, []);

  const handleAddTodo = (): void => {
    if (newTodoText.trim()) {
      const todoText = `${newTodoText.trim()} (by ${user?.name || 'Guest'})`;
      dispatch(addTodo(todoText));
      setNewTodoText('');
    }
  };

  const handleRemoveTodo = (id: number): void => {
    Alert.alert('Remove Todo', 'Are you sure?', [
      {text: 'Cancel'},
      {text: 'Remove', onPress: () => dispatch(removeTodo(id))},
    ]);
  };

  const handleClearCompleted = (): void => {
    Alert.alert('Clear Completed', 'Remove all completed todos?', [
      {text: 'Cancel'},
      {text: 'Clear', onPress: () => dispatch(clearCompleted())},
    ]);
  };

  const renderTodoItem = ({item}: {item: TodoItem}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: item.completed ? '#f0f0f0' : '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
      }}>
      <Text
        onPress={() => dispatch(toggleTodo(item.id))}
        style={{
          flex: 1,
          textDecorationLine: item.completed ? 'line-through' : 'none',
          color: item.completed ? '#888' : '#000',
          fontSize: 16,
        }}>
        {item.text}
      </Text>
      <Button
        title="Remove"
        color="red"
        onPress={() => handleRemoveTodo(item.id)}
      />
    </View>
  );

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 18, marginBottom: 20}}>Todo Mini App</Text>

      {user?.isLoggedIn ? (
        <Text style={{marginBottom: 10}}>Welcome back, {user.name}! 👋</Text>
      ) : (
        <Text style={{marginBottom: 10, color: 'orange'}}>
          Please login from host app
        </Text>
      )}

      {/* Add Todo Input */}
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 10,
            marginRight: 10,
          }}
          value={newTodoText}
          onChangeText={setNewTodoText}
          placeholder="Enter new todo..."
          onSubmitEditing={handleAddTodo}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>

      {/* Filter Buttons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}>
        <Button
          title="All"
          onPress={() => dispatch(setFilter('all'))}
          color={filter === 'all' ? 'blue' : 'gray'}
        />
        <Button
          title="Pending"
          onPress={() => dispatch(setFilter('pending'))}
          color={filter === 'pending' ? 'blue' : 'gray'}
        />
        <Button
          title="Completed"
          onPress={() => dispatch(setFilter('completed'))}
          color={filter === 'completed' ? 'blue' : 'gray'}
        />
      </View>

      {/* Clear Completed */}
      {todos.some((todo: any) => todo.completed) && (
        <Button
          title="Clear Completed"
          onPress={handleClearCompleted}
          color="orange"
        />
      )}

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTodoItem}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 20, color: '#888'}}>
            No todos yet. Add one! 📝
          </Text>
        }
      />

      <Text style={{marginTop: 20, fontSize: 12, color: '#666'}}>
        Active reducers: {getReducerNames().join(', ')}
      </Text>
      <Text style={{fontSize: 12, color: '#666'}}>
        Total: {todos.length} | Completed:{' '}
        {todos.filter((t: any) => t.completed).length}
      </Text>
    </View>
  );
};
