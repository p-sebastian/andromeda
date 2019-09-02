import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'
import ABackground from '@common/Background.component'
import { do_api_sonarr_get_series } from '@actions/api.actions'
import { useApi } from '@hooks/useApi'
import { ISeriesValue, IEntity } from '@interfaces/common.interface'
import SeriesItem from '@components/Series-Item.component'
import { useShallowSelector } from '@utils/recipes.util'
import { ExpansionContext } from '../../context/Expansion.context'
import CardExpansion from '@common/Card-Expansion.component'
import { logger } from '@utils/logger.util'

const SonarrHomeScreen: ScreenFComponent = () => {
  // const [dimensions, setDimensions] = useState({
  //   offsetX: 0,
  //   offsetY: 0,
  //   elmHeight: 0,
  //   elmWidth: 0,
  //   selected: false
  // })
  const series = useShallowSelector(state => state.sonarr.entities.series)
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_series(),
    state => state.sonarr.result.series
  )
  // const { selected, ...props } = dimensions
  // logger.info(dimensions)
  return (
    <ABackground>
      {/* <ExpansionContext.Provider value={{ dimensions, setDimensions } as any}> */}
      <FlatList
        initialNumToRender={8}
        onRefresh={doRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        data={result}
        renderItem={renderItem(series)}
        ListHeaderComponent={Container}
      />
      {/* </ExpansionContext.Provider>
      {selected ? <CardExpansion {...props} /> : null} */}
    </ABackground>
  )
}
SonarrHomeScreen.navigationOptions = {}

const keyExtractor = (key: number) => key.toString()
const renderItem = (series: IEntity<ISeriesValue>) => ({ item }: any) => (
  <SeriesItem key={item} series={series[item]} />
)

const Container = styled.View`
  padding-top: 10;
`

export default SonarrHomeScreen
