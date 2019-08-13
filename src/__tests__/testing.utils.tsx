import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'

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
