import { combineEpics } from 'redux-observable'
import { NAVIGATION_EPICS } from './navigation.epic'
import { SERVER_EPICS } from './server.epic'

export default combineEpics(...NAVIGATION_EPICS, ...SERVER_EPICS)
