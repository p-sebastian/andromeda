import { ActionType } from 'typesafe-actions'

import * as themeActions from './theme.actions'
export type ThemeActionsType = ActionType<typeof themeActions>

import * as navigationActions from './navigation.actions'
export type NavigationActionsType = ActionType<typeof navigationActions>

export { themeActions, navigationActions }
