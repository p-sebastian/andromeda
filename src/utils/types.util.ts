import React from 'react'
import {
  NavigationScreenProps,
  NavigationScreenConfig,
  NavigationScreenProp,
  NavigationParams,
  NavigationProp,
  NavigationRouter
} from 'react-navigation'
import { Epic } from 'redux-observable'
import { RootState } from '../redux/reducers'
import {
  ThemeActionsType,
  NavigationActionsType,
  ServerActionsType
} from '../redux/actions'
import { BASE } from './theme.util'
import { ScreenNames } from 'app.routes'
import { ThemeEnum, ServerEnum } from './enums.util'

/**
 * T: Navigation passed params interface
 */
type NavProps<T> = NavigationScreenProps<T>

/**
 * P: Props
 * S: State
 * A: Passed params by navigation will be in
 * this.props.navigation.state.params[param]
 */
export abstract class ScreenComponent<
  P = {},
  S = {},
  A = {}
> extends React.Component<P & NavProps<A>, S> {}

export type ScreenFComponent<P = {}, options = {}> = React.FC<P> & {
  navigationOptions?: NavigationScreenConfig<options>
}
export type TNavigation = NavigationScreenProp<{}, NavigationParams> &
  NavigationProp<{}>
export type CustomNavigator = React.FC<{
  navigation: TNavigation
}> & { router: NavigationRouter }

/**
 * Generalize Epic type
 * A must extend all of the actionsTypes
 *
 * Epic<InputActions, OutputActions, RootState, InjectedDependencies>
 */
export type TActions =
  | ThemeActionsType
  | NavigationActionsType
  | ServerActionsType
type TDependencies = {}
export type TEpic<A extends TActions> = Epic<A, A, RootState, TDependencies>

export type TTheme = typeof BASE
// add theme prop for styled components
export type StyledThemeP = { theme: TTheme }

export type ServerNames = 'sonarr' | 'radarr' | 'lidarr' | 'sabnzbd' | 'torrent'
export type ServerStatus = 'online' | 'offline'
export type TServer = {
  key: ServerEnum
  title: ServerNames
  themeKey: ThemeEnum
  tabs: ScreenNames[]
}
export type TAvailableServers<R = TServer> = {
  [key in ServerEnum]: R
}
