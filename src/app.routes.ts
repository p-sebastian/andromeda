import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  TabNavigatorConfig
} from 'react-navigation'
import { ShowsScreen, UpcomingScreen } from '@screens/index'
import AHeader from '@common/Header.component'
import { AMaterialTopTabBar } from './components'

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

/**
 * The switch is meant to render the tabs of the selected
 * module, since all are different
 */
const AppSwitch = createSwitchNavigator({
  Sonarr: SonarrTabs
})

/**
 * Root Navigation
 * This is the main component stack, which will render
 * the switch as the initial screen.
 * This is a stack because screens navigated from the tabs
 * will be rendered on top of everything to use all the screen
 */
const ScreenStack = createStackNavigator(
  {
    main: AppSwitch
  },
  {
    defaultNavigationOptions: {
      header: AHeader as any
    }
  }
)

export default createAppContainer(ScreenStack)
