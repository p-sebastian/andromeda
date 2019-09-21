import { createReducer } from 'typesafe-actions'
import { AVAILABLE_SERVERS } from '@utils/constants.util'
import {
  TActions,
  ServerStatus,
  TAvailableServers,
  TServer
} from '@utils/types.util'
import {
  SERVER_SET_ENABLED,
  SERVER_SET_STATUS,
  SERVER_MODIFY_COMPLETE,
  NETWORK_CHANGE,
  NETWORK_ENDPOINT_TOGGLE
} from '@actions/types'
import { ServerEnum } from '@src/utils/enums.util'
import { NetInfoStateType } from '@react-native-community/netinfo'

export type TServerConfig = {
  enabled: boolean
  status: ServerStatus
  apiKey: string
  lanUrl: string
  lanPort: string
  remoteUrl: string
  remotePort: string
  endpoint: 'lan' | 'remote'
}
export type TServerState = TServer & TServerConfig
type State = TAvailableServers<TServerState>
const flatten = (servers: TAvailableServers) => {
  const obj: State = Object.assign({}, servers) as any
  Object.values(servers).forEach(({ key }) => {
    obj[key] = {
      ...obj[key],
      enabled: false,
      status: 'offline',
      apiKey: '',
      lanUrl: '',
      lanPort: '',
      remoteUrl: '',
      remotePort: '',
      endpoint: 'lan'
    }
  })
  return obj
}

/**
 * {
 *    [ServerEnum]: {
 *      ...[TServer & ...]
 *    }
 * }
 */
const DEFAULT_STATE = flatten(AVAILABLE_SERVERS)
export const serverReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  .handleAction(SERVER_SET_ENABLED, (state, action) => {
    const { enabled, which } = action.payload
    return { ...state, [which]: { ...state[which], enabled } }
  })
  .handleAction(SERVER_SET_STATUS, (state, action) => {
    const { status, which } = action.payload
    return { ...state, [which]: { ...state[which], status } }
  })
  .handleAction(SERVER_MODIFY_COMPLETE, (state, action) => {
    const { serverKey, value } = action.payload
    const withPrev = { ...state[serverKey], ...value, enabled: true }
    return { ...state, [serverKey]: withPrev }
  })
  .handleAction(NETWORK_CHANGE, (state, action) => {
    const endpoint = action.payload === NetInfoStateType.wifi ? 'lan' : 'remote'
    const newState: State = {} as any
    Object.values(ServerEnum).forEach(
      key => (newState[key] = { ...state[key], endpoint })
    )
    return newState
  })
  .handleAction(
    NETWORK_ENDPOINT_TOGGLE,
    (state, { payload: { serverKey, endpoint } }) => ({
      ...state,
      [serverKey]: { ...state[serverKey], endpoint }
    })
  )
