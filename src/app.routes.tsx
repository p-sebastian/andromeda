import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  TabNavigatorConfig
} from 'react-navigation'
import {
  ShowsScreen,
  UpcomingScreen,
  HomeScreen,
  SettingsScreen,
  ServerConfigScreen,
  HistoryScreen,
  MoviesScreen,
  TorrentAllScreen,
  AddSeriesScreen
} from '@screens/index'
import { AMaterialTopTabBar } from './components'
import { useASelector, useADispatch } from '@utils/recipes.util'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { ServerNames } from '@utils/types.util'
import AHeader from '@common/Header.component'

const tabConfig: TabNavigatorConfig = {
  tabBarComponent: AMaterialTopTabBar,
  swipeEnabled: false,
  resetOnBlur: true,
  lazy: true
}

const SonarrTabs = createMaterialTopTabNavigator(
  {
    Shows: ShowsScreen,
    Upcoming: UpcomingScreen,
    History: HistoryScreen
  },
  tabConfig
)
const RadarrTabs = createMaterialTopTabNavigator(
  {
    Movies: MoviesScreen
  },
  tabConfig
)
const LidarrTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen
  },
  tabConfig
)
const SabnzbdTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen
  },
  tabConfig
)
const TorrentTabs = createMaterialTopTabNavigator(
  {
    All: TorrentAllScreen
  },
  tabConfig
)

/**
 * The switch is meant to render the tabs of the selected
 * module, since all are different
 */
const AppSwitch = createSwitchNavigator({
  Sonarr: SonarrTabs,
  Radarr: RadarrTabs,
  Lidarr: LidarrTabs,
  Sabnzbd: SabnzbdTabs,
  Torrent: TorrentTabs
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
 * Puts a header in all tabs, can only be done
 * in a stacknavigator
 * [screens] on top of tabs as modals, must be put here
 */
const withHeaderStack = createStackNavigator(
  {
    Tabs: AppSwitch,
    Addseries: AddSeriesScreen
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
    Main: withHeaderStack,
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
 */
export type ScreenNames =
  | ServerNames
  | 'settings'
  | 'upcoming'
  | 'shows'
  | 'config'
  | 'history'
  | 'movies'
  | 'addseries'
  | 'add'
  | 'all'

export default AppNavigator
