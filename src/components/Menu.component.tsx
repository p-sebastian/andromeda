import React from 'react'
import { Dimensions, FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-navigation'
import AMenuItem from './Menu-Item.component'
import { TMenuItem } from '@utils/types.util'
const SCREEN_HEIGHT = Dimensions.get('window').height

const FAKE = [
  { key: '1', title: 'sonarr', isOnline: false },
  { key: '2', title: 'radarr', isOnline: true },
  { key: '3', title: 'lidarr', isOnline: true },
  { key: '4', title: 'headphones', isOnline: false },
  { key: '5', title: 'sabnzbd', isOnline: true },
  { key: '6', title: 'transmission', isOnline: false },
  { key: '7', title: 'nzbget', isOnline: true },
  { key: '8', title: 'couchpotato', isOnline: false }
]
const AMenu: React.FC = () => {
  return (
    <SContainer>
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
