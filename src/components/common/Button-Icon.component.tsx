import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import React from 'react'
import styled from 'styled-components/native'

type TIcon = 'ionicons' | 'material'
type Props = {
  onPress: () => void
  size?: number
  name: string
  icon?: TIcon
  loading?: boolean
}
const ButtonIcon: React.FC<Props> = props => {
  const { onPress, name, size = 28, icon = 'ionicons', loading = false } = props
  const Icon = which(icon)
  return (
    <Button onPress={onPress}>
      {loading ? <Spinner /> : <Icon name={name} size={size} />}
    </Button>
  )
}

const which = (icon: TIcon) => {
  switch (icon) {
    case 'ionicons':
      return IoniconI
    case 'material':
      return MaterialI
    default:
      return IoniconI
  }
}

const MaterialI = styled(MaterialIcons)`
  color: ${COLORS[ColorEnum.MAIN]};
`
const IoniconI = styled(Ionicons)`
  color: ${COLORS[ColorEnum.MAIN]};
`
const Spinner = styled.ActivityIndicator`
  color: ${COLORS[ColorEnum.MAIN]};
`
const Button = styled.TouchableOpacity``

export default React.memo(ButtonIcon)
