import { createReducer } from 'typesafe-actions'
import { AVAILABLE_SERVERS } from '@utils/constants.util'
import { ThemeEnum } from '@utils/enums.util'
import { TMenuItem, TActions, ServerStatus } from '@utils/types.util'
import { SERVER_SET_ENABLED, SERVER_SET_STATUS } from '@actions/types'

const flatten = (servers: TMenuItem[]) => {
  const obj: {
    [key in keyof typeof ThemeEnum]: { status: ServerStatus; enabled: boolean }
  } = {} as any
  servers
    .filter(({ key }) => key !== ThemeEnum.MAIN)
    .forEach(
      ({ key }) =>
        (obj[key] = {
          status: 'offline',
          enabled: false
        })
    )
  return obj
}
/**
 * {
 *  [enum]: { enabled: boolean, online: boolean }
 * }
 */
const DEFAULT_STATE = flatten(AVAILABLE_SERVERS)
export const serverReducer = createReducer<typeof DEFAULT_STATE, TActions>(
  DEFAULT_STATE
)
  .handleAction(SERVER_SET_ENABLED, (state, action) => {
    const { toggle, which } = action.payload
    return { ...state, [which]: { ...state[which], enabled: toggle } }
  })
  .handleAction(SERVER_SET_STATUS, (state, action) => {
    const { status, which } = action.payload
    return { ...state, [which]: { ...state[which], status } }
  })
