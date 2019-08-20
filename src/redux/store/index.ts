import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import { createEpicMiddleware } from 'redux-observable'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

import { rootReducer, RootState } from '../reducers'
import epics from '../epics'

/**
 * MAKE SURE TO TAKE THE INSTANCE NOT THE CLASS
 */

const epicMiddleware = createEpicMiddleware({
  dependencies: {}
})
const navigationMiddleware = createReactNavigationReduxMiddleware<RootState>(
  state => state.navigation
)
const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  console.info('CREATED STORE')
  const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(navigationMiddleware, thunk, epicMiddleware)
  )
  const persistor = persistStore(store)
  // persistor.purge()
  epicMiddleware.run(epics as any)
  return { store, persistor }
}
