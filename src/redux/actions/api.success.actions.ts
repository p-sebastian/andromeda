import { IRawSeries, TNrmlzResponse } from '@interfaces/common.interface'
import { IEpisode } from '@interfaces/episode.interface'
import { IPath } from '@interfaces/path.interface'
import { IProfile } from '@interfaces/profile.interface'
import { createAction } from 'typesafe-actions'

import {
  API_RADARR_GET_MOVIES_SUCCESS,
  API_SONARR_GET_CALENDAR_SUCCESS,
  API_SONARR_GET_EPISODES_SUCCESS,
  API_SONARR_GET_HISTORY_SUCCESS,
  API_SONARR_GET_PATHS_SUCCESS,
  API_SONARR_GET_PROFILES_SUCCESS,
  API_SONARR_GET_SEARCH_SUCCESS,
  API_SONARR_GET_SERIES_SUCCESS
} from './types'

/*********** Success calls, managed by epics **********/

/* SONARR */
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
export const on_api_sonarr_get_history_success = createAction(
  API_SONARR_GET_HISTORY_SUCCESS,
  action => (payload: TNrmlzResponse<'history'>, isOf: string) =>
    action(payload, isOf)
)
export const on_api_sonarr_get_search_success = createAction(
  API_SONARR_GET_SEARCH_SUCCESS,
  action => (
    payload: IRawSeries<{ coverType: string; url: string }>[],
    isOf: string
  ) => action(payload, isOf)
)
export const on_api_sonarr_get_paths_success = createAction(
  API_SONARR_GET_PATHS_SUCCESS,
  action => (payload: IPath[], isOf: string) => action(payload, isOf)
)
export const on_api_sonarr_get_profiles_success = createAction(
  API_SONARR_GET_PROFILES_SUCCESS,
  action => (payload: IProfile[], isOf: string) => action(payload, isOf)
)

/* RADARR */
type MoviesResponse = TNrmlzResponse<'images' | 'movies'>
export const on_api_radarr_get_movies_success = createAction(
  API_RADARR_GET_MOVIES_SUCCESS,
  action => (payload: MoviesResponse, isOf: string) => action(payload, isOf)
)
