import { ApiActionsType } from '@actions/index'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { ServerEnum } from '@utils/enums.util'
import { capitalize } from 'lodash'
import { createAction } from 'typesafe-actions'

import {
  ACTION_SHEET_ON_EPISODE,
  ACTION_SHEET_ON_SEASON,
  ACTION_SHEET_OPEN,
  API_AJAX_FAIL,
  CLEAR_COMMAND,
  CLEAR_EPISODES,
  CLEAR_SEARCH_SERIES,
  COMMAND_COMPLETE,
  NETWORK_CHANGE,
  NETWORK_ENDPOINT_TOGGLE,
  SIDEBAR_TOGGLE,
  SPINNER_CLEAR,
  SPINNER_TOGGLE,
  TOAST_HIDE,
  TOAST_SHOW
} from './types'

export const do_api_ajax_fail = createAction(
  API_AJAX_FAIL,
  action => (error: { action: ApiActionsType; error: any }) => action(error)
)

export const do_spinner_toggle = createAction(
  SPINNER_TOGGLE,
  action => (isOf: string, toggle: boolean) => action({ isOf, toggle })
)
export const do_spinner_clear = createAction(SPINNER_CLEAR)

export const do_clear_episodes = createAction(CLEAR_EPISODES)

export const do_clear_search_series = createAction(CLEAR_SEARCH_SERIES)
export const do_clear_command = createAction(
  CLEAR_COMMAND,
  action => (ids: number[]) => action(ids)
)
export const do_command_complete = createAction(
  COMMAND_COMPLETE,
  action => (ids: number[]) => action(ids)
)

export const do_action_sheet_open = createAction(
  ACTION_SHEET_OPEN,
  action => ({ title, options }: { title: string; options: string[] }) =>
    action({ title, options: [...options, 'Cancel'].map(capitalize) })
)

export const on_action_sheet_season = createAction(ACTION_SHEET_ON_SEASON)

export const on_action_sheet_episode = createAction(
  ACTION_SHEET_ON_EPISODE,
  action => (index: number) => action(index)
)

export const do_sidebar_toggle = createAction(
  SIDEBAR_TOGGLE,
  action => (toggle: boolean) => action(toggle)
)

export const do_toast_show = createAction(
  TOAST_SHOW,
  action => (
    msg: string,
    type: 'error' | 'warning' | 'info' | 'success' = 'info',
    position: 'top' | 'bottom' | 'center' = 'top',
    duration: number = 5000
  ) => action({ msg, type, position, duration })
)

export const do_toast_hide = createAction(TOAST_HIDE)

export const do_network_change = createAction(
  NETWORK_CHANGE,
  action => (type: NetInfoStateType) => action(type)
)

export const do_network_endpoint_toggle = createAction(
  NETWORK_ENDPOINT_TOGGLE,
  action => (serverKey: ServerEnum, endpoint: 'lan' | 'remote') =>
    action({ serverKey, endpoint })
)
