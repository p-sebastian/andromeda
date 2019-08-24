import { action } from 'typesafe-actions'
import {
  SERVER_ENABLED,
  SERVER_SET_ENABLED,
  SERVER_SET_STATUS,
  SERVER_MODIFY,
  SERVER_MODIFY_COMPLETE
} from './types'
import { ServerEnum } from '@utils/enums.util'
import { ServerStatus } from '@utils/types.util'
import { TInputs } from '@common/Form.component'
import { TServerConfig } from '@reducers/server.reducer'

export const do_server_enabled = () => action(SERVER_ENABLED)
export const do_server_set_enabled = (which: ServerEnum, enabled: boolean) =>
  action(SERVER_SET_ENABLED, { which, enabled })
export const do_server_set_status = (which: ServerEnum, status: ServerStatus) =>
  action(SERVER_SET_STATUS, { which, status })
export const do_server_modify = (inputs: TInputs, serverKey: ServerEnum) =>
  action(SERVER_MODIFY, { inputs, serverKey })
export const do_server_modify_complete = (server: {
  serverKey: ServerEnum
  value: TServerConfig
}) => action(SERVER_MODIFY_COMPLETE, server)
