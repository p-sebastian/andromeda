import { createAction } from 'typesafe-actions'
import {
  API_AJAX_GET,
  API_SONARR_GET_SERIES,
  API_SONARR_GET_SERIES_SUCCESS
} from './types'
import { ServerEnum } from '@utils/enums.util'

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
