/* eslint-disable react/display-name */
import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { render } from 'react-native-testing-library'
import {
  renderHook,
  RenderHookResult,
  RenderHookOptions
} from '@testing-library/react-hooks'

import { RootState } from '@reducers/index'
import { FAKE_STATE } from '../jest_config/fakeData'
import mockStore from '../jest_config/reduxStore'

const INITIAL_STATE: RootState = FAKE_STATE
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

const withWrapper: (initialState: RootState) => React.FC = initialState => ({
  children
}) => <Provider store={mockStore(initialState)}>{children}</Provider>
/**
 * Calls hook and wraps it in a redux Provider, with default state
 * of RootState
 * @param callback callback calling hook to test
 * @param initialProps params that gets passed to callback
 * @param initialState initial state of redux
 */
export const renderHookWRedux = <P, R>(
  callback: (props?: P) => R,
  initialProps: P = null as any,
  initialState: RootState = INITIAL_STATE
): RenderHookResult<P, R> => {
  const options: RenderHookOptions<P> = {
    initialProps,
    wrapper: withWrapper(initialState)
  }
  return renderHook<P, R>(callback, options)
}
