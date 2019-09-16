import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import { COLORS, FONT } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { extractCondition } from '@src/utils/recipes.util'
import { Keyboard } from 'react-native'

type Props = {
  readonly accessibilityLabel: string
  readonly onChange: (value: string) => void
  onPress?: () => void
  touchable?: boolean
  placeholder?: string
}
const SearchBar: React.FC<Props> = ({
  accessibilityLabel,
  onChange,
  touchable = false,
  onPress = () => {},
  placeholder = 'Search'
}) => {
  const _onPress = useCallback(() => {
    Keyboard.dismiss()
    onPress()
  }, [onPress])
  return (
    <Padding>
      <Container>
        {!touchable ? (
          <IconContainer>
            <Ionicons name="ios-search" color="white" size={28} />
          </IconContainer>
        ) : null}
        <Input
          accessibilityLabel={accessibilityLabel}
          placeholder={placeholder}
          placeholderTextColor="#b0bec5"
          onChangeText={onChange}
          touchable={touchable}
          clearButtonMode="always"
          clearTextOnFocus
          enablesReturnKeyAutomatically
          onSubmitEditing={_onPress}
        />
        {touchable ? (
          <TouchableContainer onPress={_onPress}>
            <Text>SEARCH</Text>
          </TouchableContainer>
        ) : null}
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
  box-shadow: ${BOX_SHADOW};
`
const IconContainer = styled.View`
  height: 100%;
  width: 60;
  justify-content: center;
  align-items: center;
`
const TouchableContainer = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
`
const Text = styled.Text`
  font-family: ${FONT.regular};
  color: white;
  padding-right: 10;
`
const Input = styled.TextInput`
  flex: 1;
  color: white;
  font-size: 14;
  padding-left: ${extractCondition<{ touchable: boolean }, any, any>(
    'touchable',
    10,
    0
  )};
`

export default React.memo(SearchBar)
