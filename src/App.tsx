import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Store from './redux/store';
import AppContainer from './app.routes';
import ADrawer from '@common/Drawer.component';
import { APicker } from './components';

console.disableYellowBox = true;

const { persistor, store } = Store ();

export default function App() {
  const [isReady, setReady] = useState (false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssets}
        onFinish={() => setReady (true)}
        onError={e => console.error (e)}
      />
    );
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ADrawer Content={APicker}>
          <AppContainer />
        </ADrawer>
      </PersistGate>
    </Provider>
  );
}

const _loadAssets = async () => {
  await Font.loadAsync ({
    'dank-mono': require ('../assets/fonts/DankMono-Regular.ttf'),
    'dank-mono-italic': require ('../assets/fonts/DankMono-Italic.ttf'),
    'fira-code-bold': require ('../assets/fonts/FiraCode-Bold.ttf')
  });
};
