import React, { useState, useEffect, useContext, useCallback } from 'react'
import styled from 'styled-components/native'
import { Animated } from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import ShowInfo from '@components/Show-Info.component'
import MovieInfo from '@components/Movie-Info.component'
import AFAB from '@common/FAB.component'
import { Ionicons } from '@expo/vector-icons'
import { ExpansionContext } from '../../context/Expansion.context'
import { ServerEnum } from '@utils/enums.util'

type Props = {
  offsetX: number
  offsetY: number
  elmHeight: number
  elmWidth: number
  id: number
  posterReq: { uri: string; headers: { [key: string]: string } }
  fanartReq: { uri: string; headers: { [key: string]: string } }
  serverKey: ServerEnum
}
const CardExpansion: React.FC<Props> = ({
  offsetX,
  offsetY,
  elmHeight,
  elmWidth,
  ..._props
}) => {
  const { dimensions, setDimensions } = useContext(ExpansionContext)
  const [animEnd, setAnimEnd] = useState(false)
  const animatedValue = useAnimate(setAnimEnd)
  const interpolate = translate(animatedValue)
  // start shrinked down
  const initialScaleX = elmWidth / SCREEN_WIDTH
  const initialScaleY = elmHeight / SCREEN_HEIGHT
  /**
   * scaling is centered, so middle x and middle y of the screen
   * when scaling down, there is a remainder to each side which is
   * equivalent to the oposite scale, so if scale is .3, then remainder is .7 * width
   * since it is centered, remainder is equal on each side, so thats why its divided by 2
   * lastly the offset, is to correctly position it to where the element was.
   */
  const translateX = interpolate([
    offsetX - (SCREEN_WIDTH * (1 - initialScaleX)) / 2,
    0
  ])
  const translateY = interpolate([
    offsetY - (SCREEN_HEIGHT * (1 - initialScaleY)) / 2,
    0
  ])
  const scaleX = interpolate([initialScaleX, 1])
  const scaleY = interpolate([initialScaleY, 1])
  const animated = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    transform: [{ translateX }, { translateY }, { scaleX }, { scaleY }],
    opacity: interpolate([0, 1])
  }
  const onPress = useCallback(() => {
    Animated.spring(animatedValue, {
      toValue: 0,
      overshootClamping: true,
      useNativeDriver: true
    }).start(() => {
      setDimensions({ ...dimensions, selected: false })
      setAnimEnd(false)
    })
  }, [animatedValue])

  return (
    <Expansion as={Animated.View} style={animated as any}>
      {_props.serverKey === ServerEnum.SONARR ? (
        <ShowInfo animEnd={animEnd} {..._props} />
      ) : null}
      {_props.serverKey === ServerEnum.RADARR ? (
        <MovieInfo animEnd={animEnd} {..._props} />
      ) : null}
      <AFAB position="top-left" onPress={onPress as any}>
        <Ionicons name="md-close" color="white" size={32} />
      </AFAB>
    </Expansion>
  )
}

const useAnimate = (
  setAnimEnd: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [animatedValue] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true
    }).start(() => {
      setAnimEnd(true)
    })
  }, [])
  return animatedValue
}

const translate = (animatedValue: Animated.Value) => (outputRange: number[]) =>
  animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange
  })

const Expansion = styled.View`
  overflow: hidden;
  flex: 1;
`
export default CardExpansion
