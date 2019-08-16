import {
  NavigationActions,
  StackActions,
  NavigationContainerComponent
} from 'react-navigation'

export class RootNavigation {
  private static _instance: RootNavigation
  private _navigator: NavigationContainerComponent | undefined

  static get instance() {
    console.info('called')
    if (!RootNavigation._instance) {
      RootNavigation._instance = new RootNavigation()
    }
    return RootNavigation._instance
  }

  set navigator(ref: NavigationContainerComponent) {
    console.info('did set')
    this._navigator = ref
    RootNavigation._instance = new RootNavigation()
    if (!this._navigator) {
    }
  }

  /**
   * Navigate from outside any screencomponent
   * @param routeName Name of ScreenComponent
   * @param params Any params to pass to the screen
   */
  navigate(routeName: string, params = {}) {
    console.info(this._navigator!.context)
    this._navigator!.dispatch(NavigationActions.navigate({ routeName, params }))
    // this._navigator!.dispatch(
    //   StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: 'Lidarr' })]
    //   })
    // )
  }

  private constructor() {}
}

export default RootNavigation.instance
