import { combineEpics } from 'redux-observable'
import { NAVIGATION_EPICS } from './navigation.epic'

export default combineEpics(...NAVIGATION_EPICS)
