import {
  NavigationActions,
  NavigationContainerComponent
} from 'react-navigation'

export class RootNavigation {
  private static _instance: RootNavigation
  private _navigator: NavigationContainerComponent | undefined

  static get instance() {
    if (!RootNavigation._instance) {
      RootNavigation._instance = new RootNavigation()
    }
    return RootNavigation._instance
  }

  set navigator(ref: NavigationContainerComponent) {
    this._navigator = ref
  }

  /**
   * Navigate from outside any screencomponent
   * @param routeName Name of ScreenComponent
   * @param params Any params to pass to the screen
   */
  navigate(routeName: string, params = {}) {
    this._navigator!.dispatch(NavigationActions.navigate({ routeName, params }))
  }

  private constructor() {}
}

export default RootNavigation.instance
