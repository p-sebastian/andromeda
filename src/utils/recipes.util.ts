import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '@reducers/index'
import { TActions, StyledThemeP } from './types.util'
import { Dispatch, useCallback } from 'react'
import { TTheme } from '@utils/types.util'

type Selector<R, S> = (state: S) => R

/**
 * Uses a shallow equal so that it doesnt trigger a
 * re render everytime when an object is returned.
 * ONLY GOES DOWN ONE LEVEL
 */
export const useShallowSelector = <TSelected, TState = RootState>(
  selector: Selector<TSelected, TState>
) => useSelector<TState, TSelected>(useCallback(selector, []), shallowEqual)

/**
 * to use when returning a primitive value from
 * the selector
 */
export const useASelector = <TSelected, TState = RootState>(
  selector: Selector<TSelected, TState>
) => useSelector<TState, TSelected>(useCallback(selector, []))

/**
 * useDispatch but with type safety
 */
export const useADispatch = () => useDispatch<Dispatch<TActions>>()

/**
 * memoizes callback so that if its sent to a child component
 * it doesnt trigger a rerender when the reference changes
 */
export const useADispatchC = (action: TActions) => {
  const dispatch = useADispatch()
  return useCallback(() => dispatch(action), [action])
}

/**
 * For use with styled components that has been
 * passed the theme prop
 */
type ThemeKey = keyof TTheme
type TExtract = (key: ThemeKey) => (props: StyledThemeP) => TTheme[ThemeKey]
export const extractStyleTheme: TExtract = key => ({ theme }) => theme[key]
