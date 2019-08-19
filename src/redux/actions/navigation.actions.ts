import { action } from 'typesafe-actions'
import { ScreenNames } from '../../app.routes'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { ThemeEnum } from '@utils/enums.util'

type Params = { theme?: ThemeEnum }
// This definition is for type safety
const navigate = (screen: ScreenNames, params: Params = {}) =>
  action(NavigationActions.NAVIGATE, { screen, params })
const _do_navigate = (screen: ScreenNames, params: Params = {}) =>
  NavigationActions.navigate({ routeName: _.capitalize(screen), params })
// navigate via action to any declared screen
export const do_navigate: typeof navigate = _do_navigate as any
