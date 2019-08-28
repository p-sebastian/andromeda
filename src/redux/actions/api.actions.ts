import { createAction } from 'typesafe-actions'
import {
  API_AJAX_GET,
  API_SONARR_GET_SERIES,
  API_SONARR_GET_SERIES_SUCCESS,
  API_SONARR_GET_CALENDAR
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
  [{ endpoint, params }, serverKey] as [
    { endpoint: T; params: any },
    typeof serverKey
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
