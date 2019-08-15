import React from 'react'
import { View, Text, Button } from 'react-native'
import { withRedux } from '../jest_config/testing.utils'
import {
  useASelector,
  useShallowSelector,
  useADispatch
} from '@utils/recipes.util'
import { changeTheme } from '@actions/theme.actions'
import { ThemeEnum } from '@utils/enums.util'
import { fireEvent } from 'react-native-testing-library'
import { ReactTestInstance } from 'react-test-renderer'

describe('recipes', () => {
  describe('Rendering', () => {
    const increment = (initial = 0) => () => initial++
    const forShallow = increment()
    const forStrict = increment()
    const ShallowChild: React.FC = () => {
      const counter = forShallow()
      useShallowSelector(state => state.theme)

      return <Text accessibilityLabel="shallow">{counter}</Text>
    }
    const StrictChild: React.FC = () => {
      const counter = forStrict()
      useASelector(state => state.theme.title)
      return <Text accessibilityLabel="strict">{counter}</Text>
    }
    const Parent: React.FC = () => {
      const dispatch = useADispatch()
      const onPress = (which = false) => () => {
        dispatch(changeTheme(which ? ThemeEnum.RADARR : ThemeEnum.SONARR))
      }
      return (
        <View>
          <ShallowChild />
          <StrictChild />
          <Button onPress={onPress()} title="sonarr"></Button>
          <Button onPress={onPress(true)} title="radarr"></Button>
        </View>
      )
    }
    const { getByA11yLabel, getByText, unmount } = withRedux(<Parent />)
    const toInt = (e: ReactTestInstance) => parseInt(e.children[0] as string)
    const dispatchSonarr = getByText('sonarr')
    const dispatchRadarr = getByText('radarr')
    const shallow = getByA11yLabel('shallow')
    const strict = getByA11yLabel('strict')
    fireEvent.press(dispatchSonarr)
    fireEvent.press(dispatchRadarr)
    fireEvent.press(dispatchRadarr)
    it('should not re-render when selector returns a primitive value, and action has been dispatched with the same value', () => {
      expect(toInt(strict)).not.toBeGreaterThan(2)
      fireEvent.press(dispatchSonarr)
      expect(toInt(strict)).not.toBeGreaterThan(3)
    })
    it('should not re-render when selector returns an object, that is shallow equals to the prev state, when action has been dispached', () => {
      expect(toInt(shallow)).not.toBeGreaterThan(3)
      fireEvent.press(dispatchSonarr)
      expect(toInt(shallow)).not.toBeGreaterThan(4)
      unmount()
    })
  })
})
