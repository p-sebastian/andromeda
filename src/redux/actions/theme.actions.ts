import { createAction } from 'typesafe-actions'
import { THEME_CHANGE, THEME_TITLE } from './types'
import { ThemeEnum } from '@utils/enums.util'
import { ScreenNames } from 'app.routes'

/**
 * Changes theme of app, based on server name
 */
export const do_theme_change = createAction(
  THEME_CHANGE,
  action => (which: ThemeEnum) => action(which)
)
export const do_theme_title = createAction(
  THEME_TITLE,
  action => (title: ScreenNames) => action(title)
)
