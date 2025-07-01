import React from 'react';

// import HomeScreen from './src/HomeScreen';
import Me from './src/Me';
// import {store} from './src/store';
import {StoreProvider} from 'RepackHostApp/SharedRedux';
// const StoreProvider = React.lazy(() => import('RepackHostApp/SharedRedux'));

export default function App() {
  return (
    <StoreProvider>
      <Me />
    </StoreProvider>
  );
}
