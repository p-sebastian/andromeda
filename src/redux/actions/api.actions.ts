import { IRawSeries } from '@interfaces/common.interface'
import { CommandEnum, ServerEnum } from '@utils/enums.util'
import moment from 'moment'
import { createAction } from 'typesafe-actions'

import {
  API_RADARR_GET_MOVIES,
  API_SONARR_GET_CALENDAR,
  API_SONARR_GET_COMMAND,
  API_SONARR_GET_EPISODES,
  API_SONARR_GET_HISTORY,
  API_SONARR_GET_PATHS,
  API_SONARR_GET_PROFILES,
  API_SONARR_GET_SEARCH,
  API_SONARR_GET_SERIES,
  API_SONARR_POST_COMMAND,
  API_SONARR_POST_SERIES
} from './types'

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

/************ Requests calls **************/

/* SONARR */
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
export const do_api_sonarr_get_search = createAction(
  API_SONARR_GET_SEARCH,
  action => (term: string) =>
    // spaces must be replaced with % for lookup
    action(
      ..._config('/series/lookup', ServerEnum.SONARR, {
        term: term.trim().replace(/\s/g, '%')
      })
    )
)
export const do_api_sonarr_get_paths = createAction(
  API_SONARR_GET_PATHS,
  action => () => action(..._config('/rootfolder', ServerEnum.SONARR))
)
export const do_api_sonarr_get_profiles = createAction(
  API_SONARR_GET_PROFILES,
  action => () => action(..._config('/profile', ServerEnum.SONARR))
)
export const do_api_sonarr_get_command = createAction(
  API_SONARR_GET_COMMAND,
  action => () => action(..._config('/command', ServerEnum.SONARR))
)

type NewSeries = IRawSeries<{ coverType: string; url: string }> & {
  addOptions: {
    ignoreEpisodesWithFiles: boolean
    ignoreEpisodesWithoutFiles: boolean
    searchForMissingEpisodes: boolean
  }
  profileId: number
  rootFolderPath: string
  seriesType: string
  seasonFolder: boolean
}
export const do_api_sonarr_post_series = createAction(
  API_SONARR_POST_SERIES,
  action => (series: NewSeries) =>
    action(..._config('/series', ServerEnum.SONARR, series))
)
// tvdbId isnt needed for the http request, but for indexing the series later
export const do_api_sonarr_post_command = createAction(
  API_SONARR_POST_COMMAND,
  action => (command: CommandEnum, seriesId: number, tvdbId: number) =>
    action(
      ..._config('/command', ServerEnum.SONARR, {
        name: command,
        seriesId,
        tvdbId
      })
    )
)

/* RADARR */
export const do_api_radarr_get_movies = createAction(
  API_RADARR_GET_MOVIES,
  action => () => action(..._config('/movie', ServerEnum.RADARR))
)
