import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-navigation'
import AMenuItem from './Menu-Item.component'
import ATopMenu from './Top-Menu.component'
import { TMenuItem } from '@utils/types.util'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import { AVAILABLE_SERVERS } from '@utils/constants.util'

const AMenu: React.FC = () => {
  return (
    <SContainer>
      <ATopMenu />
      <FlatList
        data={AVAILABLE_SERVERS}
        renderItem={renderItem}
        keyExtractor={keyExtract}
      />
    </SContainer>
  )
}

const renderItem: ListRenderItem<TMenuItem> = ({ item }) => (
  <AMenuItem item={item} />
)

const keyExtract = (item: TMenuItem) => item.key.toString()

const SContainer = styled(SafeAreaView)`
  height: ${SCREEN_HEIGHT - 60};
`

export default AMenu
