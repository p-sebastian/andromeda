import { createAction } from 'typesafe-actions'
import {
  API_SONARR_GET_SERIES,
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY
} from './types'
import { ServerEnum } from '@utils/enums.util'
import moment from 'moment'

/**
 * type constraints endpoint and server
 * @param endpoint API endpoint to call, makes it an string constant
 * @param serverKey Server calling, needed for api.utils
 * @param params if any to pass to the api call
 */
const _config = <T extends string, K extends ServerEnum>(
  endpoint: T,
  serverKey: K,
  params: any = {}
) =>
  [{ endpoint, params }, { serverKey, isOf: endpoint }] as [
    { endpoint: T; params: any },
    { serverKey: typeof serverKey; isOf: T }
  ]

/**
 * Requests calls
 */

export const do_api_sonarr_get_series = createAction(
  API_SONARR_GET_SERIES,
  action => () => action(..._config('/series', ServerEnum.SONARR))
)

export const do_api_sonarr_get_calendar = createAction(
  API_SONARR_GET_CALENDAR,
  action => () => {
    const today = moment()
    const start = today.format('YYYY-MM-DD')
    const end = today.add(7, 'd').format('YYYY-MM-DD')
    return action(..._config('/calendar', ServerEnum.SONARR, { start, end }))
  }
)
export const do_api_sonarr_get_episodes = createAction(
  API_SONARR_GET_EPISODES,
  action => (seriesId: number) =>
    action(..._config('/episode', ServerEnum.SONARR, { seriesId }))
)
export const do_api_sonarr_get_history = createAction(
  API_SONARR_GET_HISTORY,
  action => (page = 1, pageSize = 100) =>
    action(..._config('/history', ServerEnum.SONARR, { page, pageSize }))
)
