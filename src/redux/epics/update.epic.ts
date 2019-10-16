import {
  do_api_sonarr_get_episodes,
  do_api_sonarr_get_series,
  do_api_sonarr_put_series
} from '@actions/api.actions'
import {
  on_api_sonarr_put_episodes_success,
  on_api_sonarr_put_series_success
} from '@actions/api.success.actions'
import { ApiActionsType, ApiSuccessActionsType } from '@actions/index'
import {
  API_SONARR_PUT_EPISODES,
  API_SONARR_PUT_EPISODES_SUCCESS,
  API_SONARR_PUT_SERIES
} from '@actions/types'
import { IRawSeries } from '@interfaces/common.interface'
import { onCase, onComplete, onError, withApi } from '@utils/api.util'
import { logger } from '@utils/logger.util'
import { TActions, TEpic } from '@utils/types.util'
import { cloneDeep } from 'lodash'
import { of } from 'rxjs'
import {
  concatMap,
  filter,
  map,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

const monitorEpisodesEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(API_SONARR_PUT_EPISODES)),
    withApi(state$, 'PUT'),
    mergeMap(ajax =>
      ajax
        .pipe(
          onCase(API_SONARR_PUT_EPISODES_SUCCESS)(
            on_api_sonarr_put_episodes_success
          )
        )
        .pipe(
          /**
           * Maps successAction to stream
           */
          map(([success]) => success as ApiSuccessActionsType),
          onError
        )
    )
  )
const monitorSeriesEpic: TEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType([API_SONARR_PUT_SERIES])),
    mergeMap(_action =>
      of<ApiActionsType>(
        do_api_sonarr_get_series(_action.payload.params.id)
      ).pipe(
        /*
         * API needs the whole series object when updating
         * since the signature is different, I retrieve it first
         * before sending the update
         * */
        withApi(state$, 'GET'),
        mergeMap(ajax =>
          ajax.pipe(
            map(([, res]) => {
              const { seasons, monitored } = _action.payload.params
              const series = res as IRawSeries<{}>
              series.monitored = monitored
              series.seasons = cloneDeep(seasons)
              return do_api_sonarr_put_series(series as any)
            })
          )
        )
      )
    ),
    withApi(state$, 'PUT'),
    mergeMap(ajax =>
      ajax.pipe(
        onCase(API_SONARR_PUT_SERIES)(on_api_sonarr_put_series_success),
        concatMap(
          ([success]) =>
            [
              success,
              // also update episode list on monitored change
              do_api_sonarr_get_episodes((success as any).payload.id)
            ] as ApiSuccessActionsType[]
        )
      )
    ),
    onError,
    onComplete(state$)
  )

export const MONITOR_EPICS = [monitorSeriesEpic, monitorEpisodesEpic]
