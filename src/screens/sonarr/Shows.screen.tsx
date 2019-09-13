import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '@utils/types.util'
import ABackground from '@common/Background.component'
import { do_api_sonarr_get_series } from '@actions/api.actions'
import { useApi } from '@hooks/useApi'
import { ISeriesValue, IEntity } from '@interfaces/common.interface'
import SeriesItem from '@components/Series-Item.component'
import { useShallowSelector, useADispatchC } from '@utils/recipes.util'
import SearchBar from '@common/Search-Bar.component'
import AFAB from '@common/FAB.component'
import { Ionicons } from '@expo/vector-icons'
import { do_navigate } from '@src/redux/actions/navigation.actions'

const SonarrHomeScreen: ScreenFComponent = () => {
  const toAddSeries = useADispatchC(do_navigate('addseries', { title: 'add' }))
  const series = useShallowSelector(state => state.sonarr.entities.series)
  const [value, setValue] = useState('')
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_series(),
    state => state.sonarr.result.series
  )

  const data = result.filter(key => series[key].title.indexOf(value) > -1)

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
