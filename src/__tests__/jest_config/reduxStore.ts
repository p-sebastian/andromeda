import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'

import { rootReducer } from '@reducers/index'
import epics from '@epics/index'
import { FAKE_STATE } from './fakeData'

export default (initialState = FAKE_STATE) => {
  const epicMiddleware = createEpicMiddleware({
    dependencies: {}
  })
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, epicMiddleware)
  )
  epicMiddleware.run(epics)
  return store
}
