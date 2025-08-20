import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo} from '../store/todoSlice';

// const LoginScreen = React.lazy(() => import('ChildAuthApp/Login'));

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();

  // const state = useSelector((state: any) => state.rootStack?.user?.name);
  const all = useSelector((state: any) => state.miniApp?.todos?.list);
  const user = useSelector((state: any) => state.rootStack?.user?.name);

  // console.log('all', all);

  return (
    <View style={styles.container}>
      <Text>Home screen {JSON.stringify(user)}</Text>
      <Text>Child data {JSON.stringify(all)}</Text>
      <Button
        title="Child app"
        onPress={() => navigation.navigate('MiniApp')}
      />
      <Button
        title="add todo"
        onPress={() => {
          console.log('qqq');
          dispatch(addTodo('Hee'));
        }}
      />
      {/* <LoginScreen /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
