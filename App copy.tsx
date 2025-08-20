import {View, Text} from 'react-native';
import React from 'react';
// import Info from 'MiniAppSecond/Info';
const Info = React.lazy(() => import('MiniAppSecond/Info'));

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <Info />
      </React.Suspense>
    </View>
  );
}
