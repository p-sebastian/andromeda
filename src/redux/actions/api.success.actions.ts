import { createAction } from 'typesafe-actions'
import {
  API_SONARR_GET_SERIES_SUCCESS,
  API_SONARR_GET_CALENDAR_SUCCESS,
  API_SONARR_GET_EPISODES_SUCCESS
} from './types'
import { TNrmlzResponse } from '@interfaces/common.interface'
import { IEpisode } from '@interfaces/episode.interface'

/**
 * Success calls, managed by epics
 */

type SeriesResponse = TNrmlzResponse<'images' | 'series'>
export const on_api_sonarr_get_series_success = createAction(
  API_SONARR_GET_SERIES_SUCCESS,
  action => (payload: SeriesResponse, isOf: string) => action(payload, isOf)
)

export const on_api_sonarr_get_calendar_success = createAction(
  API_SONARR_GET_CALENDAR_SUCCESS,
  action => (payload: TNrmlzResponse<'calendar'>, isOf: string) =>
    action(payload, isOf)
)
export const on_api_sonarr_get_episodes_success = createAction(
  API_SONARR_GET_EPISODES_SUCCESS,
  action => (payload: { [key: string]: IEpisode[] }, isOf: string) =>
    action(payload, isOf)
)
