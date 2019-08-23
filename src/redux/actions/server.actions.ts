import { action } from 'typesafe-actions'
import { SERVER_ENABLED, SERVER_SET_ENABLED, SERVER_SET_STATUS } from './types'
import { ServerEnum } from '@utils/enums.util'
import { ServerStatus } from '@utils/types.util'

export const server_enabled = () => action(SERVER_ENABLED)
export const server_set_enabled = (which: ServerEnum, enabled: boolean) =>
  action(SERVER_SET_ENABLED, { which, enabled })
export const server_set_status = (which: ServerEnum, status: ServerStatus) =>
  action(SERVER_SET_STATUS, { which, status })
