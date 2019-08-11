import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RootState } from '@reducers/index'
import { BASE } from '@utils/theme.util'

const mockStore = configureStore([thunk])
const INITIAL_STATE: RootState = {
  theme: BASE
}
export const withRedux = (
  ui: React.ReactElement,
  initialState = INITIAL_STATE
) => ({
  ...render(<Provider store={mockStore(initialState)}>{ui}</Provider>)
  // adding `store` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
})
