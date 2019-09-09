import React from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { BORDER_RADIUS } from '@utils/position.util'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'

type Props = {
  accessibilityLabel: string
  readonly onChange: (value: string) => void
}
const SearchBar: React.FC<Props> = ({ accessibilityLabel, onChange }) => {
  return (
    <Padding>
      <Container>
        <IconContainer>
          <Ionicons name="ios-search" color="white" size={28} />
        </IconContainer>
        <Input
          accessibilityLabel={accessibilityLabel}
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={onChange}
        />
      </Container>
    </Padding>
  )
}

const Padding = styled.View`
  padding: 10px;
`
const Container = styled.View`
  width: 100%;
  height: 50;
  flex-direction: row;
  border-radius: ${BORDER_RADIUS};
  background: ${COLORS[ColorEnum.GRAY]};
`
const IconContainer = styled.View`
  height: 100%;
  width: 60;
  justify-content: center;
  align-items: center;
`

const Input = styled.TextInput`
  flex: 1;
  color: white;
  font-size: 14;
`

export default SearchBar
