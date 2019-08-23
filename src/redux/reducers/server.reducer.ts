import { createReducer } from 'typesafe-actions'
import { AVAILABLE_SERVERS } from '@utils/constants.util'
import {
  TActions,
  ServerStatus,
  TAvailableServers,
  TServer
} from '@utils/types.util'
import { SERVER_SET_ENABLED, SERVER_SET_STATUS } from '@actions/types'

type State = TAvailableServers<
  TServer & { enabled: boolean; status: ServerStatus }
>
const flatten = (servers: TAvailableServers) => {
  const obj: State = Object.assign({}, servers) as any
  Object.values(servers).forEach(({ key }) => {
    obj[key].enabled = false
    obj[key].status = 'offline'
  })
  return obj
}

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
