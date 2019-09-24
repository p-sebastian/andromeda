import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { SCREEN_HEIGHT } from '@src/utils/dimensions.util'
import { FONT, COLORS } from '@src/utils/constants.util'
import { Ionicons } from '@expo/vector-icons'
import { isIphoneX } from '@src/utils/helpers.util'
import { useASelector, useADispatch } from '@src/utils/recipes.util'
import NetInfo from '@react-native-community/netinfo'
import { do_network_change } from '@actions/general.actions'
import { ColorEnum } from '@utils/enums.util'
import { useTheme } from '@src/hooks/useTheme'

type Props = { title: string }
const NetworkInfo: React.FC<Props> = ({ title }) => {
  const { primary } = useTheme()
  const loading = useASelector(state => state.spinner.loading)
  const serverKey = useASelector(state => state.theme.selectedServer)
  const endpoint = useASelector(
    state => state.server[serverKey].endpoint,
    serverKey
  )
  const status = useASelector(
    state => state.server[serverKey].status,
    serverKey
  )
  const iconProps = icon(endpoint, status)
  useNetwork()

  return (
    <SRotate>
      <STitle>{title}</STitle>
      <NetworkIcon {...iconProps} size={24} />
      <ActivityIndicator animating={loading} color={primary} />
    </SRotate>
  )
}

const icon = (endpoint: string, status: string) => {
  const props = { name: '', color: 'white' }
  props.name = endpoint === 'lan' ? 'md-cloud' : 'md-globe'
  switch (status) {
    case 'offline':
      props.color = COLORS[ColorEnum.DANGER]
      break
    case 'auth':
      props.color = COLORS[ColorEnum.RADARR]
      break
    default:
      props.color = 'white'
  }
  return props
}

const useNetwork = () => {
  const dispatch = useADispatch()
  useEffect(() => {
    const subscription = NetInfo.addEventListener(state =>
      dispatch(do_network_change(state.type))
    )
    return subscription
  }, [])
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
