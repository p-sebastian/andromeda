import React from 'react'
import styled from 'styled-components/native'
import { ScreenFComponent, TMenuItem } from '@utils/types.util'
import { THEME } from '@utils/theme.util'
import { ThemeEnum } from '@utils/enums.util'
import ACard from '@common/Card.component'
import AText from '@common/Text.component'
import { ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { AVAILABLE_SERVERS } from '@utils/constants.util'
import AInfo from '@common/Info-Text.component'
import AFAB from '@common/FAB.component'
import { MARGIN } from '@utils/position.util'
import { useServer } from '@hooks/useServer'

const SettingsScreen: ScreenFComponent = () => {
  const [enabled, disabled] = useServer()

  return (
    <Container>
      <ACard color="hsla(228, 11%, 28%, 1)">
        <STitle>Servers</STitle>
        {verify(!enabled.length)}
      </ACard>
      <AFAB />
    </Container>
  )
}

const verify = (nonEnabled: boolean) => {
  if (nonEnabled) {
    return (
      <MessageView>
        <AInfo>
          No servers added, press the add sign below to add and configure one
        </AInfo>
      </MessageView>
    )
  }
  return (
    <FlatList
      data={AVAILABLE_SERVERS}
      renderItem={renderItem}
      keyExtractor={keyExtract}
    />
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
const MessageView = styled.View`
  margin-top: ${MARGIN};
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
