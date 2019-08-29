import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableHighlight } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'
import {
  useADispatch,
  useADispatchC,
  useShallowSelector
} from '@utils/recipes.util'
import ABackground from '@common/Background.component'
// import { ISeries } from '@interfaces/index'
import { do_api_sonarr_get_series } from '@actions/api.actions'
import AText from '@common/Text.component'
import { ISeries } from '@interfaces/series.interface'

const SonarrHomeScreen: ScreenFComponent = () => {
  useSeries()
  const { result, entities } = useShallowSelector(state => state.sonarr.series)
  return (
    // <ABackground>
    //   {result.map(k => (
    //     <AText>{entities!.series[k].title}</AText>
    //   ))}
    </ABackground>
  )
}
SonarrHomeScreen.navigationOptions = {}

// const Item = (series: ISeries) => (key: number) => <AText>{series[key]}</AText>
const useSeries = () => {
  // const [series, setSeries] = useState<ISeries[]>([])
  // const series = us
  const fetch = useADispatchC(do_api_sonarr_get_series())
  useEffect(() => {
    fetch()
  }, [])
}

export default SonarrHomeScreen
