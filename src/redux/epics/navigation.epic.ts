import { isOfType } from 'typesafe-actions'
import { filter, mergeMap } from 'rxjs/operators'
import { NavigationActionsType, ThemeActionsType } from '../actions'
import { TEpic } from '@utils/types.util'
import { NAVIGATE_TO } from '../actions/types'
import { navigateComplete } from '../actions/navigation.actions'
import _ from 'lodash'
import { concat, of } from 'rxjs'
import { changeTheme } from '@actions/theme.actions'
import { ThemeEnum } from '@utils/enums.util'

const navigateEpic: TEpic<NavigationActionsType | ThemeActionsType> = (
  $action,
  {},
  { RootNavigation }
) =>
  $action.pipe(
    filter(isOfType(NAVIGATE_TO)),
    mergeMap(action => {
      const { screen, params } = action.payload
      RootNavigation.navigate(_.capitalize(screen), params)
      return concat(
        of(navigateComplete()),
        of(changeTheme(ThemeEnum[screen.toLocaleUpperCase() as any] as any))
      )
    })
  )

export const NAVIGATION_EPICS = [navigateEpic]
