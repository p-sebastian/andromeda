import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { ScreenFComponent, TActions } from '@utils/types.util'
import { THEME } from '@utils/theme.util'
import { ThemeEnum, ColorEnum } from '@utils/enums.util'
import ACard from '@common/Card.component'
import AText from '@common/Text.component'
import ABackground from '@common/Background.component'
import { ListRenderItem, ActionSheetIOS } from 'react-native'
import AInfo from '@common/Info-Text.component'
import AFAB from '@common/FAB.component'
import { MARGIN } from '@utils/position.util'
import { useServer } from '@hooks/useServer'
import _ from 'lodash'
import { COLORS, FONT } from '@utils/constants.util'
import { useADispatch, extractCondition } from '@utils/recipes.util'
import { do_navigate } from '@actions/navigation.actions'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { Ionicons } from '@expo/vector-icons'
import { TServerState } from '@reducers/server.reducer'
import { do_api_sonarr_get_calendar } from '@actions/api.actions'

type Dispatch = React.Dispatch<TActions>
const SettingsScreen: ScreenFComponent = () => {
  const [enabled, disabled] = useServer()
  const dispatch = useADispatch()
  const onPress = useCallback(() => _onPress(disabled, dispatch), [disabled])

  return (
    <ABackground>
      <ACard color={COLORS[ColorEnum.GRAY]}>
        <STitle>Servers</STitle>
        {verify(enabled, dispatch)}
      </ACard>
      <AFAB onPress={onPress}>
        <Ionicons name="md-add" color="white" size={32} />
      </AFAB>
    </ABackground>
  )
}

const _onPress = (disabled: TServerState[], dispatch: Dispatch) => {
  const titles = [...disabled.map(s => s.title), 'Cancel'].map(_.capitalize)
  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: 'Available Servers',
      options: titles,
      cancelButtonIndex: disabled.length,
      tintColor: COLORS[ThemeEnum.MAIN]
    },
    index => {
      if (index === disabled.length) {
        return
      }
      dispatch(do_navigate('config', disabled[index]))
    }
  )
}

const verify = (enabled: TServerState[], dispatch: Dispatch) => {
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
    <SwipeListView
      data={enabled}
      renderItem={renderItem(dispatch)}
      keyExtractor={keyExtract}
    />
  )
}

// @todo add chevron icon to list item, to know its swipable
const renderItem: (
  dispatch: Dispatch
) => // eslint-disable-next-line react/display-name
ListRenderItem<TServerState> = dispatch => ({ item, index }) => (
  <ItemRow
    disableRightSwipe
    rightOpenValue={-100}
    stopRightSwipe={-125}
    preview={index === 0}
  >
    <ItemBack>
      <ItemButton
        onPress={() => dispatch(do_api_sonarr_get_calendar())}
        isFirst
      >
        <ButtonIcon name="ios-sync" size={28} />
      </ItemButton>
      <ItemButton>
        <ButtonIcon
          name="md-create"
          onPress={() => dispatch(do_navigate('config', item))}
          size={28}
        />
      </ItemButton>
    </ItemBack>
    <ItemFront>
      <ItemText>{item.title}</ItemText>
    </ItemFront>
  </ItemRow>
)

const keyExtract = (item: TServerState) => item.key.toString()
const ItemRow = styled(SwipeRow)`
  border-bottom-width: 1;
  border-bottom-color: white;
`
const ItemBack = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-left: 20;
`
const ItemFront = styled.View`
  height: 50;
  justify-content: center;
  align-items: center;
  background: ${COLORS[ColorEnum.GRAY]};
`
const ItemButton = styled.TouchableOpacity`
  position: absolute;
  background: ${extractCondition<{ isFirst?: boolean }, any>(
    'isFirst',
    COLORS[ColorEnum.INFO],
    COLORS[ColorEnum.SUCCESS]
  )};
  justify-content: center;
  align-items: center;
  right: ${extractCondition<{ isFirst?: boolean }, any>('isFirst', 50, 0)};
  width: 50;
  bottom: 0;
  top: 0;
`
const ItemText = styled(AText)`
  font-family: ${FONT.bold};
  color: white;
  text-transform: capitalize;
`
const ButtonIcon = styled(Ionicons)`
  color: ${COLORS[ColorEnum.MAIN]};
`
const MessageView = styled.View`
  margin-top: ${MARGIN};
`
const STitle = styled(AText)`
  font-size: 18px;
  color: white;
`

export default SettingsScreen
