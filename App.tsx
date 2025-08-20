import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import RootStack from './src/RootStack';
// import {StoreProvider} from './src/shared';
// import {store} from './src/redux'; // Adjust the import path as necessary
import {store} from 'na-components'; // Adjust the import path as necessary

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
