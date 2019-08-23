import { isOfType } from 'typesafe-actions'
import { filter, mergeMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { NavigationActionsType, ThemeActionsType } from '../actions'
import { TEpic } from '@utils/types.util'
import _ from 'lodash'
import { do_theme_change, do_theme_title } from '@actions/theme.actions'
import { NavigationActions } from 'react-navigation'
import { AVAILABLE_SERVERS } from '@utils/constants.util'
import { concat, of, Observable } from 'rxjs'
import { ScreenNames, ScreenStack } from '../../app.routes'
import { ThemeEnum } from '@utils/enums.util'
import { do_navigate_back_complete } from '@actions/navigation.actions'
import { logger } from '@utils/logger.util'

type NavAction = {
  type: NavigationActionsType
  params?: { theme?: ThemeEnum }
  routeName: ScreenNames
}
const navigateEpic: TEpic<NavigationActionsType | ThemeActionsType> = action$ =>
  action$.pipe(
    filter(isOfType(NavigationActions.NAVIGATE)),
    mergeMap((action: any) => {
      const { routeName, params = {} } = action as NavAction
      const screenName = routeName.toLocaleLowerCase() as ScreenNames
      const which = Object.values(AVAILABLE_SERVERS).find(
        v => v.title === screenName
      )
      const actions = [of(do_theme_title(screenName))] as Observable<
        ThemeActionsType
      >[]
      const theme = params.theme
      if (theme || which) {
        actions.push(of(do_theme_change(theme || which!.themeKey)))
      }
      return concat(...actions)
    })
  )

const onNavigationBackEpic: TEpic<NavigationActionsType | ThemeActionsType> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(NavigationActions.BACK)),
    withLatestFrom(state$),
    map(([, state]) => {
      const path = ScreenStack.router
        .getPathAndParamsForState(state.navigation)
        .path.toLocaleLowerCase()
      const i = path.lastIndexOf('/') + 1
      return do_theme_title(path.substring(i) as ScreenNames)
    })
  )
export const NAVIGATION_EPICS = [navigateEpic, onNavigationBackEpic]
