import { combineEpics } from 'redux-observable'
import { NAVIGATION_EPICS } from './navigation.epic'
import { SERVER_EPICS } from './server.epic'
import { API_EPICS } from './api.epic'
import { GENERAL_EPICS } from './general.epic'

export default combineEpics(
  ...NAVIGATION_EPICS,
  ...SERVER_EPICS,
  ...API_EPICS,
  ...GENERAL_EPICS
)
