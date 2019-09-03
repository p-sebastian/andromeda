import React, { useMemo } from 'react'
import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { makePan } from '@hooks/usePanBottomDrawer'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import { logger } from '@utils/logger.util'

const HALF_HEIGHT = SCREEN_HEIGHT * 0.5
const DRAGGABLE_HEIGHT = SCREEN_HEIGHT * 0.125

const usePanBottomDrawer = makePan(HALF_HEIGHT, DRAGGABLE_HEIGHT)

type Props = {}
const BottomDrawer: React.FC<Props> = () => {
  const animatedValue = useMemo(
    () => new Animated.Value(HALF_HEIGHT - DRAGGABLE_HEIGHT),
    []
  )
  const panResponder = usePanBottomDrawer(animatedValue)
  const animated = { transform: [{ translateY: animatedValue }] }

  return (
    <Container as={Animated.View} style={animated as any}>
      <Draggable as={Animated.View} {...panResponder.panHandlers} />
      <Text>asdasd</Text>
    </Container>
  )
}

const Draggable = styled.View`
  height: ${SCREEN_HEIGHT * 0.125};
  width: 100%;
  background: white;
`
const Container = styled.View`
  border-top-left-radius: 50;
  border-top-right-radius: 50;
  position: absolute;
  overflow: hidden;
  height: ${HALF_HEIGHT};
  background: white;
  bottom: 0;
  width: 100%;
`
const Text = styled.Text``

export default BottomDrawer
