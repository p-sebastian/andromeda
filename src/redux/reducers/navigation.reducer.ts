import { ScreenStack } from '../../app.routes'
import { NavigationActions } from 'react-navigation'

const INITIAL_ACTION = { type: NavigationActions.INIT }
const DEFAULT_STATE = ScreenStack.router.getStateForAction(INITIAL_ACTION)

export const navigationReducer = (state = DEFAULT_STATE, action: any) => {
  // Our Navigator's router is now responsible for
  // creating our navigation state object
  return ScreenStack.router.getStateForAction(action, state)
}
