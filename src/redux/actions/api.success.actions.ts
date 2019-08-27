import { createAction } from 'typesafe-actions'
import { API_SONARR_GET_SERIES_SUCCESS } from './types'

/**
 * Success calls, managed by epics
 */

export const on_api_sonarr_get_series_success = createAction(
  API_SONARR_GET_SERIES_SUCCESS,
  action => (payload: any) => action(payload)
)
