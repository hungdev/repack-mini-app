import React, {Suspense, useEffect} from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {injectSlices} from 'na-components';
import {allReducers} from '../store'; // Adjust the import path as necessary

import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  useEffect(() => {
    injectSlices(allReducers, {namespace: 'miniApp'});
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
