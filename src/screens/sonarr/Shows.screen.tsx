import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'
import { useShallowSelector } from '@utils/recipes.util'
import ABackground from '@common/Background.component'
import { do_api_sonarr_get_series } from '@actions/api.actions'
import AText from '@common/Text.component'
import { useApi } from '@hooks/useApi'
import { ISeriesValue } from '@interfaces/common.interface'
import { logger } from '@utils/logger.util'

const SonarrHomeScreen: ScreenFComponent = () => {
  const [{ result, entities }, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_series(),
    state => state.sonarr.series
  )
  return (
    <ABackground>
      <FlatList
        onRefresh={doRefresh}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        data={result}
        renderItem={renderItem(entities.series)}
      />
    </ABackground>
  )
}
SonarrHomeScreen.navigationOptions = {}

const keyExtractor = (key: number) => key.toString()
const renderItem = (series: { [key: number]: ISeriesValue }) => ({
  item
}: any) => (
  <Item>
    <Text>{series[item].title}</Text>
  </Item>
)
const Item = styled.View`
  height: 40;
`
const Text = styled(AText)`
  color: white;
`

export default SonarrHomeScreen
