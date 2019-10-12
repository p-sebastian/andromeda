import AHeader from '@common/Header.component'
import {
  AddInfoScreen,
  AddSeriesScreen,
  HistoryScreen,
  HomeScreen,
  MovieInfoScreen,
  MoviesScreen,
  ServerConfigScreen,
  SettingsScreen,
  ShowInfoScreen,
  ShowsScreen,
  SonarrTaskScreen,
  TorrentAllScreen,
  UpcomingScreen
} from '@screens/index'
import { useADispatch, useASelector } from '@utils/recipes.util'
import { transitionConfig } from '@utils/transition.util'
import { ServerNames } from '@utils/types.util'
import React from 'react'
import {
  StackNavigatorConfig,
  TabNavigatorConfig,
  createMaterialTopTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import { createReduxContainer } from 'react-navigation-redux-helpers'

import { AMaterialTopTabBar } from './components'

const tabConfig: TabNavigatorConfig = {
  tabBarComponent: AMaterialTopTabBar,
  tabBarOptions: {
    scrollEnabled: true
  },
  swipeEnabled: false,
  resetOnBlur: true,
  lazy: true
}
const stackConfig: StackNavigatorConfig = {
  transitionConfig,
  mode: 'modal',
  defaultNavigationOptions: {
    header: AHeader as any
  }
}

const SonarrTabs = createMaterialTopTabNavigator(
  {
    Shows: ShowsScreen,
    Upcoming: UpcomingScreen,
    History: HistoryScreen,
    Tasks: SonarrTaskScreen
  },
  tabConfig
)
const SonarrStack = createStackNavigator(
  {
    Tabs: SonarrTabs,
    Showinfo: ShowInfoScreen,
    Addseries: AddSeriesScreen,
    Addinfo: AddInfoScreen
  },
  stackConfig
)
const RadarrTabs = createMaterialTopTabNavigator(
  {
    Movies: MoviesScreen
  },
  tabConfig
)
const RadarrStack = createStackNavigator(
  {
    Tabs: RadarrTabs,
    Movieinfo: MovieInfoScreen
  },
  stackConfig
)
const LidarrTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen
  },
  tabConfig
)
const LidarrStack = createStackNavigator(
  {
    Tabs: LidarrTabs
  },
  stackConfig
)
const SabnzbdTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen
  },
  tabConfig
)
const SabnzbdStack = createStackNavigator(
  {
    Tabs: SabnzbdTabs
  },
  stackConfig
)
const TorrentTabs = createMaterialTopTabNavigator(
  {
    All: TorrentAllScreen
  },
  tabConfig
)
const TorrentStack = createStackNavigator(
  {
    Tabs: TorrentTabs
  },
  stackConfig
)

/**
 * The switch is meant to render the tabs of the selected
 * module, since all are different
 */
const AppSwitch = createSwitchNavigator({
  Sonarr: SonarrStack,
  Radarr: RadarrStack,
  Lidarr: LidarrStack,
  Sabnzbd: SabnzbdStack,
  Torrent: TorrentStack
})

const ModalStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Config: ServerConfigScreen
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      header: AHeader as any
    }
  }
)
/**
 * Root Navigation
 * This is the main component stack, which will render
 * the switch as the initial screen.
 * This is a stack because screens navigated from the tabs
 * will be rendered on top of everything to use all the screen
 */
export const ScreenStack = createSwitchNavigator(
  {
    Main: AppSwitch,
    Modal: ModalStack
  },
  {
    initialRouteName: 'Modal'
  }
)

/**
 * Merges Navigation State and Dispatch with redux
 */
const ReduxNavigationContainer = createReduxContainer(ScreenStack)
const AppNavigator: React.FC = () => {
  const state = useASelector(_state => _state.navigation)
  const dispatch = useADispatch()
  return <ReduxNavigationContainer state={state} dispatch={dispatch} />
}
/**
 * Screen Names for typing the navigator
 * aside from actual name in navigator, if it uses an
 * especial title, it must also be added such as
 * addseries -> add
 */
export type ScreenNames =
  | ServerNames
  | 'tabs'
  | 'settings'
  | 'upcoming'
  | 'shows'
  | 'config'
  | 'history'
  | 'movies'
  | 'movieinfo'
  | 'addseries'
  | 'add'
  | 'all'
  | 'addinfo'
  | 'info'
  | 'showinfo'

export default AppNavigator
