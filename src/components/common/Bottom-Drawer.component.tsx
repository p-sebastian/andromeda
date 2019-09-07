import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { makePan } from '@hooks/usePanBottomDrawer'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { logger } from '@utils/logger.util'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { MARGIN } from '@utils/position.util'
import AText from './Text.component'

// from Show-Info
const POSTER_HEIGHT = (SCREEN_WIDTH * 0.25) / 0.69
const HALF_HEIGHT = SCREEN_HEIGHT * 0.625 - POSTER_HEIGHT / 2
const DRAGGABLE_HEIGHT = SCREEN_HEIGHT * 0.125

const usePanBottomDrawer = makePan(HALF_HEIGHT, DRAGGABLE_HEIGHT)

type Props = { children: React.ReactNode }
const BottomDrawer: React.FC<Props> = ({ children }) => {
  const animatedValue = useMemo(
    () => new Animated.Value(HALF_HEIGHT - DRAGGABLE_HEIGHT),
    []
  )
  const panResponder = usePanBottomDrawer(animatedValue)
  const animated = { transform: [{ translateY: animatedValue }] }

  return (
    <Container as={Animated.View} style={animated as any}>
      <Draggable as={Animated.View} {...panResponder.panHandlers}>
        <Title>Episodes</Title>
      </Draggable>
      <Bar />
      <Content>{children}</Content>
    </Container>
  )
}

const Draggable = styled.View`
  height: ${SCREEN_HEIGHT * 0.125};
  width: 100%;
  background: #eeeef8;
  justify-content: center;
  align-items: center;
`
const Container = styled.View`
  border-top-left-radius: 50;
  border-top-right-radius: 50;
  position: absolute;
  overflow: hidden;
  height: ${HALF_HEIGHT};
  background: #eeeef8;
  bottom: 0;
  width: 100%;
`
const Bar = styled.View`
  position: absolute;
  width: 15%;
  height: 5;
  border-radius: 50;
  background: ${COLORS[ColorEnum.MAIN]};
  align-self: center;
  top: ${MARGIN};
`
const Title = styled(AText)`
  text-align: center;
  font-size: 18;
`
const Content = styled.View`
  flex: 1;
`

export default BottomDrawer
