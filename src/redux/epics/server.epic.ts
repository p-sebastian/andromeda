import { isOfType } from 'typesafe-actions'
import { TEpic } from '@utils/types.util'
import { SERVER_MODIFY } from '@actions/types'
import { mergeMap, filter } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { do_navigate_back } from '@actions/navigation.actions'
import { ServerEnum } from '@utils/enums.util'
import { TServerConfig } from '@reducers/server.reducer'
import { do_server_modify_complete } from '@actions/server.actions'

const modifyEpic: TEpic = action$ =>
  action$.pipe(
    filter(isOfType(SERVER_MODIFY)),
    mergeMap(action => {
      const { inputs, serverKey } = action.payload
      const value = {} as any
      Object.keys(inputs).forEach(k => (value[k] = inputs[k].value))
      const server: { serverKey: ServerEnum; value: TServerConfig } = {
        value,
        serverKey
      }
      return concat(
        ...[of(do_server_modify_complete(server)), of(do_navigate_back())]
      )
    })
  )

export const SERVER_EPICS = [modifyEpic]
