import { action } from 'typesafe-actions'
import { THEME_CHANGE } from './types'
import { ThemeEnum } from '@utils/enums.util'

export const changeTheme = (which: ThemeEnum) => action(THEME_CHANGE, which)
