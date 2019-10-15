import {
  do_api_ajax_fail,
  do_spinner_clear,
  do_spinner_toggle
} from '@actions/general.actions'
import { ApiActionsType } from '@actions/index'
import { ApiSuccessActionsType } from '@actions/index'
import { do_server_set_status } from '@actions/server.actions'
import { API_AJAX_FAIL } from '@actions/types'
import { RootState } from '@reducers/index'
import { TServerState } from '@reducers/server.reducer'
import { logger } from '@utils/logger.util'
import { memoize, values } from 'lodash'
import { StateObservable } from 'redux-observable'
import { Observable, OperatorFunction, of } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { AjaxResponse } from 'rxjs/internal/observable/dom/AjaxObservable'
import { catchError, concatMap, map, tap, withLatestFrom } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

import { ServerEnum } from './enums.util'
import { nrmlz } from './normalizr.util'
import { TActions } from './types.util'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
type AjaxCreator = (
  endpoint: any,
  method: Method,
  body: any
) => Observable<AjaxResponse>
/**
 * @param usable params that will be used to create the key for caching
 */
const _ajaxConfig = ({
  enabled,
  status,
  ...usable
}: TServerState): AjaxCreator => (endpoint, method, body) => {
  const memo = memoize(formUrl, args => values(args).join('_'))
  const [baseURL, headers] = memo(usable as any)
  let url = `${baseURL}${endpoint}`
  if (method === 'GET') {
    url += `?${queryString(body)}`
  }
  // sending anything in the body on a GET
  // breaks the request
  return ajax({
    headers,
    method,
    url,
    body: method === 'GET' ? undefined : body,
    timeout: 10000
  })
}
type WithApi = (
  state$: StateObservable<RootState>,
  method: Method
) => OperatorFunction<ApiActionsType, Observable<[ApiActionsType, any]>>
/**
 * returns mapped tuple [action, responseObservable]
 * all actions merging this MUST HAVE meta with ServerEnum
 * @param state$ passed when calling manually
 * @param method: {Method}
 * @arg action$ incoming input stream
 */
export const withApi: WithApi = (state$, method) => action$ =>
  action$.pipe(
    withLatestFrom(state$),
    map(([action, state]) => {
      const { endpoint, params } = action.payload
      return _ajaxConfig(state.server[action.meta.serverKey])(
        endpoint,
        method,
        params
      ).pipe(
        // bubble error up with action
        catchError(error => {
          throw { action, error }
        }),
        map(res => [action, res.response] as [ApiActionsType, any])
      )
    })
  )
/**
 * [C] type constant
 * [A] incoming action
 */
type OnCase<C = string, A = TActions> = (
  CONSTANT: C
) => (
  callback: (response: any, isOf: string) => A
) => OperatorFunction<[A, any], [A, any]>
/**
 *
 * @param CONSTANT Action constant
 */
export const onCase: OnCase = CONSTANT => callback => action$ =>
  action$.pipe(
    map(([action, response]) =>
      !isOfType(CONSTANT, action)
        ? [action, response]
        : [
            callback(
              nrmlz(CONSTANT, response),
              (action as ApiActionsType).meta.isOf
            ),
            response
          ]
    )
    // tap(([, res]) => logger.info('normalized', res))
  )
type OnComplete = (
  state$: StateObservable<RootState>
) => OperatorFunction<TActions, TActions>
export const onComplete: OnComplete = state$ => action$ =>
  action$.pipe(
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const actions: TActions[] = isOfType(API_AJAX_FAIL, action)
        ? [do_spinner_clear()]
        : [
            do_spinner_toggle((action as ApiSuccessActionsType).meta, false),
            do_server_set_status(state.theme.selectedServer, 'online')
          ]
      actions.push(action)
      return actions
    })
  )
type OnError = OperatorFunction<any, TActions>
export const onError: OnError = action$ =>
  action$.pipe(
    catchError(error => {
      logger.error(error)
      return of(do_api_ajax_fail(error))
    })
  )

type FormUrl = (
  server: TServerState,
  ssl?: boolean
) => [string, { [key: string]: string }]
/**
 * returns tuple [url, headers]
 * @param server
 * @param ssl use https
 */
const formUrl: FormUrl = (
  { key, lanPort, lanUrl, remotePort, remoteUrl, endpoint, apiKey },
  ssl = false
) => {
  const url = endpoint === 'lan' ? lanUrl : remoteUrl
  const port = endpoint === 'lan' ? lanPort : remotePort
  const headers = { 'Content-Type': 'application/json' }

  switch (key) {
    case ServerEnum.SONARR:
      return [
        `http${ssl ? 's' : ''}://${url}:${port}/api`,
        { ...headers, 'X-Api-Key': apiKey }
      ]
    case ServerEnum.RADARR:
      return [
        `http${ssl ? 's' : ''}://${url}:${port}/api`,
        { ...headers, 'X-Api-Key': apiKey }
      ]
    default:
      return ['', { '0': '0' }]
  }
}

export const uriForImage = (server: TServerState, imagePath: string) => {
  const [baseUrl, headers] = formUrl(server)
  return { uri: `${baseUrl}${imagePath}`, headers }
}

const queryString = (body: any = {}) =>
  Object.keys(body)
    .map(key => `${key}=${body[key]}`)
    .join('&')
