import { isOfType } from 'typesafe-actions'
import { filter, mergeMap, tap, map } from 'rxjs/operators'
import { NavigationActionsType, ThemeActionsType } from '../actions'
import { TEpic } from '@utils/types.util'
import _ from 'lodash'
import { do_theme_change, do_theme_title } from '@actions/theme.actions'
import { NavigationActions } from 'react-navigation'
import { AVAILABLE_SERVERS } from '@utils/constants.util'
import { concat, of, Observable } from 'rxjs'
import { ScreenNames } from 'app.routes'
import { ThemeEnum } from '@utils/enums.util'
import { do_navigate_back_complete } from '@actions/navigation.actions'

type NavAction = {
  type: NavigationActionsType
  params: any
  routeName: ScreenNames
}
const navigateEpic: TEpic<NavigationActionsType | ThemeActionsType> = $action =>
  $action.pipe(
    filter(isOfType(NavigationActions.NAVIGATE)),
    mergeMap((action: any) => {
      const { routeName, params = {} } = action as NavAction
      const screenName = routeName.toLocaleLowerCase() as ScreenNames
      const which = AVAILABLE_SERVERS.find(s => s.title === screenName)
      const actions = [of(do_theme_title(screenName))] as Observable<
        ThemeActionsType
      >[]
      const theme = params.theme as ThemeEnum
      if (theme || which) {
        actions.push(of(do_theme_change(theme || which!.key)))
      }
      return concat(...actions)
    })
  )

const onNavigationBackEpic: TEpic<
  NavigationActionsType | ThemeActionsType
> = $action =>
  $action.pipe(
    filter(isOfType(NavigationActions.BACK)),
    tap(action => console.info(action)),
    map(() => do_navigate_back_complete())
  )
export const NAVIGATION_EPICS = [navigateEpic, onNavigationBackEpic]
