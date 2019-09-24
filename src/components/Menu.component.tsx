import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-navigation'
import AMenuItem from './Menu-Item.component'
import ATopMenu from './Top-Menu.component'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import { useShallowSelector, useASelector } from '@utils/recipes.util'
import { ServerEnum } from '@utils/enums.util'

const AMenu: React.FC = () => {
  const enabled = useShallowSelector(state => state.temp.enabledServers)
  const selectedServer = useASelector(state => state.theme.selectedServer)
  // only need to pass selectedServer
  return (
    <SContainer>
      <ATopMenu />
      <FlatList
        extraData={selectedServer}
        data={enabled}
        renderItem={renderItem(selectedServer)}
        keyExtractor={keyExtract}
      />
    </SContainer>
  )
}

const renderItem: (
  selectedServer: ServerEnum
) => ListRenderItem<ServerEnum> = selectedServer => ({ item }) => (
  <AMenuItem serverKey={item} selected={item === selectedServer} />
)

const keyExtract = (item: ServerEnum) => item.toString()

const SContainer = styled(SafeAreaView)`
  height: ${SCREEN_HEIGHT - 60};
`

// memoizing here disables the parent rendering this
// only the selectors trigger the re-render
export default React.memo(AMenu)
