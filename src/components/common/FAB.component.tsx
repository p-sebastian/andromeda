import React from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import { MARGIN, BOX_SHADOW } from '@utils/position.util'
import { Ionicons } from '@expo/vector-icons'

type Props = { onPress?: (event: GestureResponderEvent) => void }
const AFAB: React.FC<Props> = ({ onPress }) => {
  return (
    <Container>
      <Button onPress={onPress}>
        <Icon name="md-add" color="white" size={32} />
      </Button>
    </Container>
  )
}

/**
 * This circle in circle fixes, jagged edges of a
 * border in a circle
 */
const Container = styled.View`
  position: absolute;
  right: ${MARGIN};
  bottom: ${MARGIN};
  height: 60;
  width: 60;
  border-radius: 50;
  background: white;
  padding: 2px;
  box-shadow: ${BOX_SHADOW};
`
const Button = styled.TouchableOpacity`
  background: hsla(228, 11%, 28%, 1);
  border-radius: 40;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`
const Icon = styled(Ionicons)``

export default React.memo(AFAB)
