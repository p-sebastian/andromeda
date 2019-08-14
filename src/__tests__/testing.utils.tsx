import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import { render } from 'react-native-testing-library'

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
})

export const withReduxRenderer = (
  ui: React.ReactElement,
  initialState = INITIAL_STATE
) => ({
  ...renderer.create(<Provider store={mockStore(initialState)}>{ui}</Provider>)
})
