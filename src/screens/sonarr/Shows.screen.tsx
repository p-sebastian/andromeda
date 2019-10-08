import { do_api_sonarr_get_series } from '@actions/api.actions'
import { do_navigate } from '@actions/navigation.actions'
import ABackground from '@common/Background.component'
import AFAB from '@common/FAB.component'
import SearchBar from '@common/Search-Bar.component'
import SeriesItem from '@components/Series-Item.component'
import { Ionicons } from '@expo/vector-icons'
import { useApi } from '@hooks/useApi'
import { IEntity, ISeriesValue } from '@interfaces/common.interface'
import { fuzzySearch } from '@utils/helpers.util'
import { useADispatchC, useShallowSelector } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'

const SonarrHomeScreen: ScreenFComponent = () => {
  const toAddSeries = useADispatchC(do_navigate('addseries', { title: 'add' }))
  const series = useShallowSelector(state => state.sonarr.entities.series)
  const [value, setValue] = useState('')
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_series(),
    state => state.sonarr.result.series
  )

  const fuse = useMemo(() => fuzzySearch(series, 'tvdbId'), [
    JSON.stringify(result)
  ])
  const data = value === '' ? result : (fuse.search(value) as number[])

  return (
    <ABackground>
      <FlatList
        initialNumToRender={8}
        onRefresh={doRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem(series)}
        ListHeaderComponent={renderHeader(setValue)}
      />
      <AFAB onPress={toAddSeries}>
        <Ionicons name="md-add" color="white" size={32} />
      </AFAB>
    </ABackground>
  )
}
SonarrHomeScreen.navigationOptions = {}

const keyExtractor = (key: number) => key.toString()
const renderItem = (series: IEntity<ISeriesValue>) => ({ item }: any) => (
  <SeriesItem series={series[item]} />
)
const renderHeader = (setValue: any) => {
  return <SearchBar accessibilityLabel="searchBar" onChange={setValue} />
}

export default SonarrHomeScreen
