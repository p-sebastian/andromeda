import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import { rootReducer } from '../reducers';
import epics from '../epics';

const epicMiddleware = createEpicMiddleware ({
  dependencies: {}
});
const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer (persistConfig, rootReducer);

export default () => {
  const store = createStore (
    persistedReducer, {}, applyMiddleware (thunk, epicMiddleware)
  );
  const persistor = persistStore (store);
  persistor.purge ();
  epicMiddleware.run (epics);
  return { store, persistor };
};
