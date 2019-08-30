import { createAction } from 'typesafe-actions'
import {
  API_SONARR_GET_SERIES_SUCCESS,
  API_SONARR_GET_CALENDAR_SUCCESS
} from './types'
import { TNrmlzResponse } from '@interfaces/common.interface'

/**
 * Success calls, managed by epics
 */

type SeriesResponse = TNrmlzResponse<'images' | 'series'>
export const on_api_sonarr_get_series_success = createAction(
  API_SONARR_GET_SERIES_SUCCESS,
  action => (payload: SeriesResponse) => action(payload)
)

export const on_api_sonarr_get_calendar_success = createAction(
  API_SONARR_GET_CALENDAR_SUCCESS,
  action => (payload: TNrmlzResponse<'calendar'>) => action(payload)
)
