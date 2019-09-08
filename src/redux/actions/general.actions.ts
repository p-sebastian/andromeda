import { createAction } from 'typesafe-actions'
import {
  API_AJAX_FAIL,
  SPINNER_TOGGLE,
  CLEAR_EPISODES,
  ACTION_SHEET_OPEN,
  ACTION_SHEET_ON_SEASON,
  ACTION_SHEET_ON_EPISODE
} from './types'
import { capitalize } from 'lodash'

export const do_api_ajax_fail = createAction(
  API_AJAX_FAIL,
  action => (error: any) => action(error)
)

export const do_spinner_toggle = createAction(
  SPINNER_TOGGLE,
  action => (toggle: boolean) => action(toggle)
)

export const do_clear_episodes = createAction(CLEAR_EPISODES)

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
