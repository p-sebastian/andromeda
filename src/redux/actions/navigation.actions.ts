import { action } from 'typesafe-actions'
import { NAVIGATE_TO, NAVIGATE_COMPLETE } from './types'
import { ScreenNames } from '../../app.routes'
import { ThemeEnum } from '@utils/enums.util'

// navigate via action to any declared screen
export const navigate = (screen: ScreenNames, params = {}) =>
  action(NAVIGATE_TO, {
    screen,
    params
  })
export const navigateComplete = () => action(NAVIGATE_COMPLETE)
