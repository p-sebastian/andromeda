import { ServerEnum } from './enums.util'
import { TServerState } from '@reducers/server.reducer'
import { memoize, values } from 'lodash'
import { Observable, OperatorFunction } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { RootState } from '@reducers/index'
import { StateObservable } from 'redux-observable'
import { withLatestFrom, map, tap, catchError } from 'rxjs/operators'
import { AjaxResponse } from 'rxjs/internal/observable/dom/AjaxObservable'
import { ApiActionsType } from '@actions/index'
import { isOfType } from 'typesafe-actions'
import { TActions } from './types.util'
import { nrmlz } from './normalizr.util'
import { logger } from '@src/utils/logger.util'

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
    timeout: 5000
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

  switch (key) {
    case ServerEnum.SONARR:
      return [
        `http${ssl ? 's' : ''}://${url}:${port}/api`,
        { 'X-Api-Key': apiKey }
      ]
    case ServerEnum.RADARR:
      return [
        `http${ssl ? 's' : ''}://${url}:${port}/api`,
        { 'X-Api-Key': apiKey }
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

const onError = () => {
  // check if actual network error
  // check network error status
  //
}
