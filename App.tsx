import React, {useEffect} from 'react';

// import HomeScreen from './src/HomeScreen';
import Me from './src/Me';
// import {store} from './src/store';
import {StoreProvider} from 'RepackHostApp/SharedRedux';
// const StoreProvider = React.lazy(() => import('RepackHostApp/SharedRedux'));
import {initMiniAppStore, cleanupMiniAppStore} from './src/store';

export default function App() {
  useEffect(() => {
    // Initialize mini app store
    initMiniAppStore();

    // // Cleanup when component unmounts
    // return () => {
    //   cleanupMiniAppStore(); // ⭐ This is the cleanup function!
    // };
  }, []);
  return (
    <StoreProvider>
      <Me />
    </StoreProvider>
  );
}
