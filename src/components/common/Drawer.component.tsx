import React, { ReactNode } from 'react'
import { Animated, View } from 'react-native'
import styled from 'styled-components/native'
import { extractStyleTheme, useASelector } from '@utils/recipes.util'
import { StyledThemeP } from '@utils/types.util'
import { usePanResponder } from '@hooks/usePanResponder'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  OFFSET,
  DRAWER_WIDTH,
  HIDDEN_WIDTH
} from '@utils/dimensions.util'
import { useTheme } from '@hooks/useTheme'
import { FONT } from '@src/utils/constants.util'

type Extra = { position: Animated.Value }
type Props = { Content?: React.FC }
/**
 * Moves the 2 screens as a whole, while applying
 * opacity to the main view
 */
const ADrawer: React.FC<Props> & Extra = ({ Content, children }) => {
  const { position } = ADrawer
  const animated = { transform: [{ translateX: position }] }

  return (
    <View>
      <SViewContainer as={Animated.View} style={animated as any}>
        <SSafeAreaView>
          <DrawerContent Content={Content} position={position} />
          <MainContent main={children} position={position} />
        </SSafeAreaView>
      </SViewContainer>
    </View>
  )
}
ADrawer.position = new Animated.Value(OFFSET)

type ContentProps = { Content?: React.FC; position: Animated.Value }
const DrawerContent: React.FC<ContentProps> = ({ Content, position }) => {
  const [theme] = useTheme()
  const loading = useASelector(state => state.spinner.loading)
  const [panResponder, title] = usePanResponder(position)
  // const [panResponder] = useState (createPanResponder (position));
  /**
   * makes title bar stick to the left, while animation is happening
   * 26, is the pixel number of the bars width;
   */
  const animate = {
    transform: [
      {
        translateX: position.interpolate({
          inputRange: [OFFSET, HIDDEN_WIDTH + 26],
          outputRange: [-OFFSET + 26, -HIDDEN_WIDTH]
        })
      }
    ]
  }

  return (
    <SDrawerView as={Animated.View} {...panResponder.panHandlers} theme={theme}>
      <SAnimatingTitleContainer as={Animated.View} style={animate as any}>
        <SRotate>
          <STitle theme={theme}>{title}</STitle>
          <ActivityIndicator animating={loading} color={theme.primary} />
        </SRotate>
      </SAnimatingTitleContainer>
      <SContentContainer>{Content ? <Content /> : null}</SContentContainer>
    </SDrawerView>
  )
}

type MainProps = { main: ReactNode; position: Animated.Value }
const MainContent: React.FC<MainProps> = ({ main, position }) => {
  const [theme] = useTheme()
  // hide main content
  const animated = {
    opacity: position.interpolate({
      inputRange: [OFFSET, HIDDEN_WIDTH],
      outputRange: [1, 0]
    })
  }

  return (
    <SMainView as={Animated.View} theme={theme}>
      <STransparentOverlay as={Animated.View} style={animated as any}>
        {main}
      </STransparentOverlay>
    </SMainView>
  )
}

/**
 * transparent overlay, that fades in color from parent
 */
const STransparentOverlay = styled.View`
  flex: 1;
`
// Container view
const SViewContainer = styled.View`
  position: absolute;
  left: 0;
`
const SSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`
const SDrawerView = styled.View<StyledThemeP>`
  position: absolute;
  flex: 1;
  width: ${DRAWER_WIDTH};
  height: ${SCREEN_HEIGHT};
  left: ${-DRAWER_WIDTH + OFFSET};
  background-color: ${extractStyleTheme('dark')};
`
const SMainView = styled.View<StyledThemeP>`
  position: absolute;
  width: ${SCREEN_WIDTH - OFFSET};
  height: ${SCREEN_HEIGHT};
  background-color: ${extractStyleTheme('primary')};
`
const SAnimatingTitleContainer = styled.View`
  position: absolute;
  z-index: 20;
  height: ${SCREEN_HEIGHT * 0.3};
  width: ${OFFSET};
  left: ${DRAWER_WIDTH - OFFSET * 1.75};
  top: 0;
  justify-content: center;
  align-items: center;
`
const SRotate = styled.View`
  position: relative;
  flex-direction: row-reverse;
  transform: rotate(270deg);
`
const ActivityIndicator = styled.ActivityIndicator`
  align-self: center;
`
const STitle = styled.Text`
  color: white;
  text-transform: capitalize;
  /* this width sets the length available for the text
   * the one limiting it is the container which must have a fixed
   * width 
   */
  width: ${SCREEN_HEIGHT * 0.35};
  text-align: center;
  font-family: ${FONT.italic};
  font-size: 24px;
`
const SContentContainer = styled.View`
  height: ${SCREEN_HEIGHT};
  /* moves to the right, so that the sidebar doesnt interfere */
  left: ${OFFSET};
`

export default ADrawer
