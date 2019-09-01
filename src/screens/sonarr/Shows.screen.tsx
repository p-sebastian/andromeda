import React from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'
import ABackground from '@common/Background.component'
import { do_api_sonarr_get_series } from '@actions/api.actions'
import { useApi } from '@hooks/useApi'
import { ISeriesValue, IEntity } from '@interfaces/common.interface'
import SeriesItem from '@components/Series-Item.component'
import { useShallowSelector } from '@utils/recipes.util'

const SonarrHomeScreen: ScreenFComponent = () => {
  const series = useShallowSelector(state => state.sonarr.entities.series)
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_series(),
    state => state.sonarr.result.series
  )
  return (
    <ABackground>
      <Container>
        <FlatList
          initialNumToRender={8}
          onRefresh={doRefresh}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          data={result}
          renderItem={renderItem(series)}
        />
      </Container>
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
