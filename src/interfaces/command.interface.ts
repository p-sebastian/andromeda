import { CommandEnum } from '@utils/enums.util'

import { IEntity } from './common.interface'

export interface ICommand {
  name: CommandEnum
  message: string
  body: {
    seriesId: number
    sendUpdatesToClient: boolean
    updateScheduledTask: boolean
    completionMessage: string
    name: CommandEnum
    trigger: string
  }
  priority: string
  status: string
  queued: Date
  started: Date
  trigger: string
  state: string
  manual: boolean
  startedOn: Date
  stateChangeTime: Date
  sendUpdatesToClient: boolean
  updateScheduledTask: boolean
  id: number
}

export type TCommand = IEntity<ICommand>
