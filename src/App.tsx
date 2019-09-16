import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Store from './redux/store'
import AppContainer from './app.routes'
import ADrawer from '@common/Drawer.component'
import { AMenu } from './components'
import { useScreens } from 'react-native-screens'
import { withExpansion } from '@components/hoc/withExpansion.hoc'
useScreens()

console.disableYellowBox = true

const { persistor, store } = Store()

const DrawerWithExpansion = withExpansion(ADrawer)
export default function App() {
  const [isReady, setReady] = useState(false)
  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssets}
        onFinish={() => setReady(true)}
        onError={e => console.error(e)}
      />
    )
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DrawerWithExpansion Content={AMenu}>
          <AppContainer />
        </DrawerWithExpansion>
      </PersistGate>
    </Provider>
  )
}

const _loadAssets = async () => {
  await Font.loadAsync({
    'dank-mono': require('../assets/fonts/DankMono-Regular.ttf'),
    'dank-mono-italic': require('../assets/fonts/DankMono-Italic.ttf'),
    'roboto-regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    'roboto-medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
    'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'roboto-bold-italic': require('../assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    'roboto-black': require('../assets/fonts/Roboto/Roboto-Black.ttf'),
    'roboto-black-italic': require('../assets/fonts/Roboto/Roboto-BlackItalic.ttf')
  })
}
