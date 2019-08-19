import { action } from 'typesafe-actions'
import { THEME_CHANGE, THEME_TITLE } from './types'
import { ThemeEnum } from '@utils/enums.util'
import { ScreenNames } from 'app.routes'

/**
 * Changes theme of app, based on server name
 */
export const do_theme_change = (which: ThemeEnum) => action(THEME_CHANGE, which)
export const do_theme_title = (title: ScreenNames) => action(THEME_TITLE, title)
