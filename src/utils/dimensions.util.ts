import { Dimensions } from 'react-native'

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width
// Sidebar size
export const OFFSET = (SCREEN_WIDTH * 10) / 100
export const DRAWER_WIDTH = (SCREEN_WIDTH * 75) / 100 + OFFSET
export const HIDDEN_WIDTH = DRAWER_WIDTH - OFFSET
/**
 * Width between the inner and outer bar
 * of the side menu
 */
export const BETWEEN_WIDTH = DRAWER_WIDTH - OFFSET * 3
