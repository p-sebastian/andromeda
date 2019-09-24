import { isOfType } from 'typesafe-actions'
import { filter, mergeMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { NavigationActionsType, ThemeActionsType } from '../actions'
import { TEpic } from '@utils/types.util'
import _ from 'lodash'
import { do_theme_change, do_theme_title } from '@actions/theme.actions'
import { NavigationActions } from 'react-navigation'
import { concat, of, Observable } from 'rxjs'
import { ScreenNames, ScreenStack } from '../../app.routes'
import { ThemeEnum } from '@utils/enums.util'
import { Keyboard } from 'react-native'
import { withinScreen } from '@src/utils/helpers.util'

type NavAction = {
  type: NavigationActionsType
  params?: { theme?: ThemeEnum; title?: ScreenNames }
  routeName: ScreenNames
}
const navigateEpic: TEpic = action$ =>
  action$.pipe(
    filter(isOfType(NavigationActions.NAVIGATE)),
    mergeMap((action: any) => {
      Keyboard.dismiss()
      const { routeName, params = {} } = action as NavAction
      const { title, theme } = params
      const screenName = routeName.toLocaleLowerCase() as ScreenNames
      const server = withinScreen(screenName)
      const actions = [
        of(do_theme_title(title || screenName, server ? server.key : undefined))
      ] as Observable<ThemeActionsType>[]
      if (theme || server) {
        actions.push(of(do_theme_change(theme || server!.themeKey)))
      }
      return concat(...actions)
    })
  )

const onNavigationBackEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(NavigationActions.BACK)),
    withLatestFrom(state$),
    map(([, state]) => {
      Keyboard.dismiss()
      const path = ScreenStack.router
        .getPathAndParamsForState(state.navigation)
        .path.toLocaleLowerCase()
      const i = path.lastIndexOf('/') + 1
      return do_theme_title(path.substring(i) as ScreenNames)
    })
  )
export const NAVIGATION_EPICS = [navigateEpic, onNavigationBackEpic]
