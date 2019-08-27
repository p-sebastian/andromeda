import { ActionType } from 'typesafe-actions'

import * as themeActions from './theme.actions'
export type ThemeActionsType = ActionType<typeof themeActions>

import * as navigationActions from './navigation.actions'
export type NavigationActionsType = ActionType<typeof navigationActions>

import * as serverActions from './server.actions'
export type ServerActionsType = ActionType<typeof serverActions>

import * as apiActions from './api.actions'
export type ApiActionsType = ActionType<typeof apiActions>

import * as apiSuccessActions from './api.success.actions'
export type ApiSuccessActionsType = ActionType<typeof apiSuccessActions>

import * as generalActions from './general.actions'
export type GeneralActionsType = ActionType<typeof generalActions>

export {
  themeActions,
  navigationActions,
  serverActions,
  apiActions,
  apiSuccessActions,
  generalActions
}
