import { createAction } from 'typesafe-actions'
import {
  SERVER_ENABLED,
  SERVER_SET_ENABLED,
  SERVER_SET_STATUS,
  SERVER_MODIFY,
  SERVER_MODIFY_COMPLETE,
  SERVER_TEST
} from './types'
import { ServerEnum } from '@utils/enums.util'
import { ServerStatus } from '@utils/types.util'
import { TInputs } from '@common/Form.component'
import { TServerConfig } from '@reducers/server.reducer'

export const do_server_enabled = () => createAction(SERVER_ENABLED)
export const do_server_set_enabled = createAction(
  SERVER_SET_ENABLED,
  action => (which: ServerEnum, enabled: boolean) => action({ which, enabled })
)
export const do_server_set_status = createAction(
  SERVER_SET_STATUS,
  action => (which: ServerEnum, status: ServerStatus) =>
    action({ which, status })
)
export const do_server_modify = createAction(
  SERVER_MODIFY,
  action => (inputs: TInputs, serverKey: ServerEnum) =>
    action({ inputs, serverKey })
)
export const do_server_modify_complete = createAction(
  SERVER_MODIFY_COMPLETE,
  action => (server: { serverKey: ServerEnum; value: TServerConfig }) =>
    action(server)
)
export const do_server_test = createAction(
  SERVER_TEST,
  action => (serverKey: ServerEnum) => action(serverKey)
)
