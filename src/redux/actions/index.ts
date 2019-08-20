import { ActionType } from 'typesafe-actions'

import * as themeActions from './theme.actions'
export type ThemeActionsType = ActionType<typeof themeActions>

import * as navigationActions from './navigation.actions'
export type NavigationActionsType = ActionType<typeof navigationActions>

import * as serverActions from './server.actions'
export type ServerActionsType = ActionType<typeof serverActions>

export { themeActions, navigationActions, serverActions }
