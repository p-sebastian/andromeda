import epics from '@epics/index'
import { RootState, rootReducer } from '@reducers/index'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

// @note: DEVELOPMENT
import Reactotron from '../../../Reactotron.config'

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
  const store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(navigationMiddleware, thunk, epicMiddleware),
      Reactotron.createEnhancer!()
    )
  )
  const persistor = persistStore(store)
  // persistor.purge()
  epicMiddleware.run(epics as any)
  return { store, persistor }
}
