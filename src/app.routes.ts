import {
  createAppContainer, createStackNavigator,
  createMaterialTopTabNavigator, createSwitchNavigator
} from 'react-navigation';
import SonarrHomeScreen from './components/sonarr/home.screen';

const SonarrTabs = createMaterialTopTabNavigator ({
  home: SonarrHomeScreen
});

/**
 * The switch is meant to render the tabs of the selected
 * module, since all are different
 */
const AppSwitch = createSwitchNavigator ({
  Sonarr: SonarrTabs
});

/**
 * Root Navigation
 * This is the main component stack, which will render
 * the switch as the initial screen.
 * This is a stack because screens navigated from the tabs
 * will be rendered on top of everything to use all the screen
 */
const ScreenStack = createStackNavigator ({
  main: AppSwitch
});


export default createAppContainer (ScreenStack);
