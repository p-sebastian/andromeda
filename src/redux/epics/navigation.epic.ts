import { isOfType } from 'typesafe-actions'
import { filter, map } from 'rxjs/operators'
import { NavigationActionsType, ThemeActionsType } from '../actions'
import { TEpic } from '@utils/types.util'
import _ from 'lodash'
import { changeTheme } from '@actions/theme.actions'
import { ThemeEnum } from '@utils/enums.util'
import { NavigationActions } from 'react-navigation'
import { AVAILABLE_SERVERS } from '@utils/constants.util'

const navigateEpic: TEpic<NavigationActionsType | ThemeActionsType> = (
  $action,
  {}
) =>
  $action.pipe(
    filter(isOfType(NavigationActions.NAVIGATE)),
    map((action: any) => {
      const which = AVAILABLE_SERVERS.find(
        s => s.title === action.routeName.toLocaleLowerCase()
      )
      return changeTheme(which === undefined ? ThemeEnum.MAIN : which.key)
    })
  )

export const NAVIGATION_EPICS = [navigateEpic]
