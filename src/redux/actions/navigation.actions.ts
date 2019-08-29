import { createAction } from 'typesafe-actions'
import { ScreenNames } from '../../app.routes'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { ThemeEnum } from '@utils/enums.util'
import { NAVIGATE_BACK_COMPLETE } from './types'

type Params = { theme?: ThemeEnum } & any
// This definition is for type safety
const navigate = createAction(
  NavigationActions.NAVIGATE,
  action => (screen: ScreenNames, params: Params = {}) =>
    action({
      screen,
      params
    })
)
const _do_navigate = (screen: ScreenNames, params: Params = {}) =>
  NavigationActions.navigate({ routeName: _.capitalize(screen), params })
// navigate via action to any declared screen
export const do_navigate: typeof navigate = _do_navigate as any

export const do_navigate_back_complete = createAction(NAVIGATE_BACK_COMPLETE)
export const do_navigate_back = createAction(NavigationActions.BACK)
