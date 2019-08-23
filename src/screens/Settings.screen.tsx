import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { ScreenFComponent, TServer, TActions } from '@utils/types.util'
import { THEME } from '@utils/theme.util'
import { ThemeEnum } from '@utils/enums.util'
import ACard from '@common/Card.component'
import AText from '@common/Text.component'
import { ListRenderItem, ActionSheetIOS } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import AInfo from '@common/Info-Text.component'
import AFAB from '@common/FAB.component'
import { MARGIN } from '@utils/position.util'
import { useServer } from '@hooks/useServer'
import _ from 'lodash'
import { logger } from '@utils/logger.util'
import { COLORS } from '@utils/constants.util'
import { useADispatch } from '@utils/recipes.util'
import { do_navigate } from '@actions/navigation.actions'

const SettingsScreen: ScreenFComponent = () => {
  const [enabled, disabled] = useServer()
  const dispatch = useADispatch()
  const onPress = useCallback(() => _onPress(disabled, dispatch), [disabled])

  return (
    <Container>
      <ACard color="hsla(228, 11%, 28%, 1)">
        <STitle>Servers</STitle>
        {verify(enabled)}
      </ACard>
      <AFAB onPress={onPress} />
    </Container>
  )
}

const _onPress = (disabled: TServer[], dispatch: React.Dispatch<TActions>) => {
  const titles = [...disabled.map(s => s.title), 'Cancel'].map(_.capitalize)
  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: 'Available Servers',
      options: titles,
      cancelButtonIndex: disabled.length,
      tintColor: COLORS[ThemeEnum.MAIN]
    },
    index => {
      logger.info(index)
      if (index === disabled.length) {
        return
      }
      dispatch(do_navigate('config', disabled[index]))
    }
  )
}

const verify = (enabled: TServer[]) => {
  if (!enabled.length) {
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
      data={enabled}
      renderItem={renderItem}
      keyExtractor={keyExtract}
    />
  )
}

const renderItem: ListRenderItem<TServer> = ({ item }) => (
  <ItemButton>
    <ItemText>{item.title}</ItemText>
  </ItemButton>
)
const keyExtract = (item: TServer) => item.key.toString()
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
