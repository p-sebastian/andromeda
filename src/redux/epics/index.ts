import { MONITOR_EPICS } from '@epics/update.epic'
import { combineEpics } from 'redux-observable'

import { API_EPICS } from './api.epic'
import { GENERAL_EPICS } from './general.epic'
import { NAVIGATION_EPICS } from './navigation.epic'
import { POLLING_EPICS } from './polling.epic'
import { SERVER_EPICS } from './server.epic'

export default combineEpics(
  ...NAVIGATION_EPICS,
  ...SERVER_EPICS,
  ...API_EPICS,
  ...GENERAL_EPICS,
  ...POLLING_EPICS,
  ...MONITOR_EPICS
)
