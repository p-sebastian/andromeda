import { on_action_sheet_episode } from '@actions/general.actions'
import { ACTION_SHEET_OPEN } from '@actions/types'
import { logger } from '@utils/logger.util'
import { TEpic } from '@utils/types.util'
import { ActionSheetIOS } from 'react-native'
import { bindCallback } from 'rxjs'
import { filter, map, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

const ASheet$ = bindCallback(ActionSheetIOS.showActionSheetWithOptions)

const actionSheetEpic: TEpic = action$ =>
  action$.pipe(
    filter(isOfType(ACTION_SHEET_OPEN)),
    mergeMap(action => {
      const { title, options } = action.payload
      const destructive = options.findIndex(
        v => v.toLocaleLowerCase().indexOf('delete') > -1
      )
      return ASheet$({
        title,
        options,
        destructiveButtonIndex: destructive > -1 ? destructive : undefined,
        cancelButtonIndex: options.length - 1
      }).pipe(map(index => [action, index] as [typeof action, number]))
    }),
    map(([action, index]) => on_action_sheet_episode(index))
  )

export const GENERAL_EPICS = [actionSheetEpic]
