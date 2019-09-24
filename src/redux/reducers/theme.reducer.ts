import { THEME_CHANGE, THEME_TITLE } from '../actions/types'
import { ThemeActionsType } from '../actions'
import { ThemeEnum, ServerEnum } from '@utils/enums.util'
import { ScreenNames } from '@src/app.routes'

/**
 * Also consists of initial page when datas been purged
 */
type State = {
  selected: ThemeEnum
  title: ScreenNames
  selectedServer: ServerEnum
}
const DEFAULT_STATE: State = {
  selected: ThemeEnum.MAIN,
  title: 'settings',
  selectedServer: ServerEnum.SONARR
}

export const themeReducer = (
  state = DEFAULT_STATE,
  action: ThemeActionsType
) => {
  switch (action.type) {
    case THEME_CHANGE:
      return { ...state, selected: action.payload }
    case THEME_TITLE:
      const { title, serverKey } = action.payload
      return {
        ...state,
        title,
        selectedServer: serverKey ? serverKey : state.selectedServer
      }
    default:
      return state
  }
}
