import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '@reducers/index'
import { TActions, StyledThemeP } from './types.util'
import { Dispatch, useCallback } from 'react'
import { TTheme } from '@utils/types.util'

export type Selector<R, S> = (state: S) => R

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
  return useCallback(() => dispatch(action), [])
}

/**
 * For use with styled components that has been
 * passed the theme prop
 */
type ThemeKey = keyof TTheme
type TExtract = (key: ThemeKey) => (props: StyledThemeP) => TTheme[ThemeKey]
export const extractStyleTheme: TExtract = key => ({ theme }) => theme[key]

/**
 * takes any prop value from an styled component
 * must pass generic with props type
 * @param key of Prop in styled component
 */
export const extractProp = <P extends {}>(key: keyof P) => (props: P) =>
  props[key] as any

/**
 * Ternary condition for evaluation value in prop and getting to others within
 * or passed value
 * @param predicate value in prop that returns boolean
 * @param onTrue value in prop or any other
 * @param onFalse value in prop or any other
 */
export const extractCondition = <P extends {}, K1 = {}, K2 = {}>(
  predicate: keyof P,
  onTrue: keyof P | K1,
  onFalse: keyof P | K2
) => (props: P) =>
  props[predicate]
    ? props[onTrue as keyof P] || onTrue
    : props[onFalse as keyof P] || onFalse

export const extractFn = <P extends {}>(
  key: keyof P,
  callback: (prop: P[typeof key]) => any
) => (props: P) => callback(props[key])
