import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import ShowInfo from '@components/Show-Info.component'
import { logger } from '@utils/logger.util'

type Props = {
  offsetX: number
  offsetY: number
  elmHeight: number
  seriesId: number
  posterUri: string
  fanartUri: string
}
const CardExpansion: React.FC<Props> = ({
  offsetX,
  offsetY,
  elmHeight,
  ..._props
}) => {
  const animatedValue = useAnimate()
  const top = translate(animatedValue, [offsetY, 0])
  const left = translate(animatedValue, [offsetX, 0])
  const right = translate(animatedValue, [offsetX, 0])
  const bottom = translate(animatedValue, [
    SCREEN_HEIGHT - offsetY - elmHeight,
    0
  ])
  const style = [
    {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      background: 'red'
    }
  ]
  return (
    <Expansion as={Animated.View} style={style as any}>
      <ShowInfo {..._props} />
    </Expansion>
  )
}

const useAnimate = () => {
  const [animatedValue] = useState(new Animated.Value(0))
  useEffect(() => {
    logger.info('started')
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500
    }).start()
  }, [])
  return animatedValue
}

const translate = (animatedValue: Animated.Value, outputRange: number[]) =>
  animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange
  })

const Expansion = styled.View``
export default CardExpansion
