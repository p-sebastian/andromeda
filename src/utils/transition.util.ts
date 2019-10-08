import { ScreenNames } from '@routes'
import { logger } from '@utils/logger.util'
import { NavigationTransitionProps, TransitionConfig } from 'react-navigation'
import { fromBottom, zoomIn, zoomOut } from 'react-navigation-transitions'

type Transition = (
  transitionProps: NavigationTransitionProps,
  prevTransitionProps: NavigationTransitionProps,
  isModal: boolean
) => TransitionConfig
export const transitionConfig: Transition = (
  transitionProps,
  prevTransitionProps,
  isModal
) => {
  const scenes = transitionProps.scenes.map(s =>
    s.route.routeName.toLocaleLowerCase()
  ) as ScreenNames[]
  // const prev = scenes[scenes.length - 2]
  const next = scenes[scenes.length - 1]
  if (next === 'showinfo') {
    return zoomIn()
  }
  if (next === 'tabs') {
    return zoomOut()
  }
  if (isModal) {
    return fromBottom()
  }
  return zoomIn()
}
