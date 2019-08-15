import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-navigation'
import AMenuItem from './Menu-Item.component'
import ATopMenu from './Top-Menu.component'
import { TMenuItem } from '@utils/types.util'
import { SCREEN_HEIGHT } from '@utils/dimensions.util'

const FAKE: TMenuItem[] = [
  { key: '1', title: 'sonarr', isOnline: false },
  { key: '2', title: 'radarr', isOnline: true },
  { key: '4', title: 'lidarr', isOnline: false },
  { key: '5', title: 'sabnzbd', isOnline: true },
  { key: '6', title: 'transmission', isOnline: false }
]
const AMenu: React.FC = () => {
  return (
    <SContainer>
      <ATopMenu />
      <FlatList data={FAKE} renderItem={renderItem} keyExtractor={keyExtract} />
    </SContainer>
  )
}

const renderItem: ListRenderItem<TMenuItem> = ({ item }) => (
  <AMenuItem item={item} />
)

const keyExtract = (item: any) => item.key
// makes sure you are moving horizontally significantly
// Math.abs (e.dy) > Math.abs (dx * 2);

const SContainer = styled(SafeAreaView)`
  height: ${SCREEN_HEIGHT};
`

export default AMenu
