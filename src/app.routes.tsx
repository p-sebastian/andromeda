import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  TabNavigatorConfig
} from 'react-navigation'
import { ShowsScreen, UpcomingScreen } from '@screens/index'
import { AMaterialTopTabBar } from './components'
import { useASelector, useADispatch } from '@utils/recipes.util'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { ServerNames } from '@utils/types.util'
import AHeader from '@common/Header.component'
import HomeScreen from '@screens/Home.screen'
import SettingsScreen from '@screens/Settings.screen'
import ServerConfigScreen from '@screens/Server-Config.screen'
import { ThemeEnum } from '@utils/enums.util'

const tabConfig: TabNavigatorConfig = {
  tabBarComponent: AMaterialTopTabBar,
  swipeEnabled: false,
  resetOnBlur: true
}

const SonarrTabs = createMaterialTopTabNavigator(
  {
    Shows: ShowsScreen,
    Upcoming: UpcomingScreen
  },
  tabConfig
)
const RadarrTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen
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
const TransmissionTabs = createMaterialTopTabNavigator(
  {
    Home: HomeScreen
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
  Transmission: TransmissionTabs
})

const ModalStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Config: ServerConfigScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
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
export const ScreenStack = createStackNavigator(
  {
    Main: AppSwitch,
    Modal: ModalStack
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      header: AHeader as any
    },
    initialRouteName: 'Modal'
  }
)

/**
 * Merges Navigation State and Dispatch with redux
 */
const ReduxNavigationContainer = createReduxContainer(ScreenStack)
const AppNavigator: React.FC = () => {
  const state = useASelector(state => state.navigation)
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

export default AppNavigator
