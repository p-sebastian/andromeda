import { combineEpics } from 'redux-observable'
import { NAVIGATION_EPICS } from './navigation.epic'
import { SERVER_EPICS } from './server.epic'
import { API_EPICS } from './api.epic'

export default combineEpics(...NAVIGATION_EPICS, ...SERVER_EPICS, ...API_EPICS)
