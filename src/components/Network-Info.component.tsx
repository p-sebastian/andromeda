import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_HEIGHT } from '@src/utils/dimensions.util'
import { FONT } from '@src/utils/constants.util'
import { Ionicons } from '@expo/vector-icons'
import { isIphoneX } from '@src/utils/helpers.util'
import { useASelector } from '@src/utils/recipes.util'

type Props = { title: string; color: string }
const NetworkInfo: React.FC<Props> = ({ title, color }) => {
  const loading = useASelector(state => state.spinner.loading)
  /*
   * wifi - lan fail -> try network
   * wifi - network fail -> offline
   * mobile -> must be network
   * mobile fail -> offline
   *
   * */
  return (
    <SRotate>
      <STitle>{title}</STitle>
      <NetworkIcon name="md-cloud-outline" color="white" size={24} />
      <ActivityIndicator animating={loading} color={color} />
    </SRotate>
  )
}

const SRotate = styled.View`
  flex-direction: row;
  transform: rotate(270deg);
  /* STitle width / 2  + some padding*/
  top: ${(SCREEN_HEIGHT * 0.3) / 2 + (isIphoneX() ? 30 : 5)};
`
const ActivityIndicator = styled.ActivityIndicator`
  position: absolute;
  /* size of icon beside */
  right: 25;
  align-self: center;
`
const NetworkIcon = styled(Ionicons)`
  align-self: center;
  justify-content: center;
  transform: rotate(90deg);
`
const STitle = styled.Text`
  color: white;
  text-transform: capitalize;
  /* this width sets the length available for the text
   * the one limiting it is the container which must have a fixed
   * width 
   */
  width: ${SCREEN_HEIGHT * 0.3};
  text-align: center;
  font-family: ${FONT.italic};
  font-size: 24px;
`

export default NetworkInfo
