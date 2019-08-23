import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-navigation'
import AMenuItem from './Menu-Item.component'
import ATopMenu from './Top-Menu.component'
import { TServer } from '@utils/types.util'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'
import { useServer } from '@hooks/useServer'

const AMenu: React.FC = () => {
  const [enabled] = useServer()
  return (
    <SContainer>
      <ATopMenu />
      <FlatList
        data={enabled}
        renderItem={renderItem}
        keyExtractor={keyExtract}
      />
    </SContainer>
  )
}

const renderItem: ListRenderItem<TServer> = ({ item }) => (
  <AMenuItem item={item} />
)

const keyExtract = (item: TServer) => item.key.toString()

const SContainer = styled(SafeAreaView)`
  height: ${SCREEN_HEIGHT - 60};
`

export default AMenu
