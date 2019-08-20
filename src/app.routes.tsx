import React from 'react'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  TabNavigatorConfig
} from 'react-navigation'
import { ShowsScreen, UpcomingScreen } from '@screens/index'
import AHeader from '@common/Header.component'
import { AMaterialTopTabBar } from './components'
import HomeScreen from '@screens/Home.screen'
import { useASelector, useADispatch } from '@utils/recipes.util'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import SettingsScreen from '@screens/Settings.screen'
import { ServerNames } from '@utils/types.util'

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
    Settings: SettingsScreen
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
    }
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
export type ScreenNames = ServerNames | 'settings' | 'upcoming' | 'shows'

export default AppNavigator
