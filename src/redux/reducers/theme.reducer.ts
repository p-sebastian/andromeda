import { THEME_CHANGE, THEME_TITLE } from '../actions/types'
import { ThemeActionsType } from '../actions'
import { ThemeEnum } from '@utils/enums.util'
import { ScreenNames } from 'app.routes'

const DEFAULT_STATE = {
  selected: ThemeEnum.SONARR as ThemeEnum,
  title: 'sonarr' as ScreenNames
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
