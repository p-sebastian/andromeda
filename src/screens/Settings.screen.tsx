import React from 'react'
import styled from 'styled-components/native'
import { ScreenFComponent, TMenuItem } from '@utils/types.util'
import { THEME } from '@utils/theme.util'
import { ThemeEnum } from '@utils/enums.util'
import ACard from '@common/Card.component'
import { AText } from '@common/index'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { AVAILABLE_SERVERS } from '@utils/constants.util'

const SettingsScreen: ScreenFComponent = () => {
  return (
    <Container>
      <ACard color="hsla(228, 11%, 28%, 1)">
        <STitle>Servers</STitle>
        <FlatList
          data={AVAILABLE_SERVERS}
          renderItem={renderItem}
          keyExtractor={keyExtract}
        />
      </ACard>
    </Container>
  )
}

const renderItem: ListRenderItem<TMenuItem> = ({ item }) => (
  <ItemButton>
    <ItemText>{item.title}</ItemText>
  </ItemButton>
)
const keyExtract = (item: TMenuItem) => item.key.toString()
const ItemText = styled.Text`
  color: white;
`
const ItemButton = styled.TouchableOpacity`
  min-height: 60px;
`

const Container = styled.View`
  flex: 1;
  background: ${THEME[ThemeEnum.MAIN].lighterDark};
`
const STitle = styled(AText)`
  font-size: 18px;
  color: white;
`

export default SettingsScreen
