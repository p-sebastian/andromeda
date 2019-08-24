import { THEME_CHANGE, THEME_TITLE } from '../actions/types'
import { ThemeActionsType } from '../actions'
import { ThemeEnum } from '@utils/enums.util'
import { ScreenNames } from 'app.routes'

/**
 * Also consists of initial page when datas been purged
 */
const DEFAULT_STATE = {
  selected: ThemeEnum.MAIN as ThemeEnum,
  title: 'Settings' as ScreenNames
}

export const themeReducer = (
  state = DEFAULT_STATE,
  action: ThemeActionsType
) => {
  switch (action.type) {
    case THEME_CHANGE:
      return { ...state, selected: action.payload }
    case THEME_TITLE:
      return { ...state, title: action.payload }
    default:
      return state
  }
}
