import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableHighlight } from 'react-native'
import { ScreenFComponent } from '../../utils/types.util'
import { useADispatch, useADispatchC } from '@utils/recipes.util'
import ABackground from '@common/Background.component'
// import { ISeries } from '@interfaces/index'
import { do_api_sonarr_get_series } from '@actions/api.actions'

const SonarrHomeScreen: ScreenFComponent = () => {
  return (
    <ABackground>
      <Text>Sonarr</Text>
    </ABackground>
  )
}
SonarrHomeScreen.navigationOptions = {}

const useSeries = () => {
  // const [series, setSeries] = useState<ISeries[]>([])
  // const series = us
  const fetch = useADispatchC(do_api_sonarr_get_series())
  useEffect(() => {
    fetch()
  }, [])
}

export default SonarrHomeScreen
