import { action } from 'typesafe-actions'
import { ScreenNames } from '../../app.routes'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { NAVIGATE_TO } from './types'

// This definition is for type safety
const navigate = (screen: ScreenNames, params = {}) =>
  action(NavigationActions.NAVIGATE, { screen, params })
const _do_navigate = (screen: ScreenNames, params = {}) =>
  NavigationActions.navigate({ routeName: _.capitalize(screen), params })
// navigate via action to any declared screen
export const do_navigate: typeof navigate = _do_navigate as any
