import React from 'react'
import { FlatList } from 'react-native'
import { ScreenFComponent } from '@utils/types.util'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import { useShallowSelector } from '@utils/recipes.util'
import { useApi } from '@hooks/useApi'
import { do_api_sonarr_get_calendar } from '@actions/api.actions'
import ABackground from '@common/Background.component'
import CalendarItem from '@components/Calendar-Item.component'
import { IEntity } from '@interfaces/common.interface'
import { CalendarValue } from '@interfaces/calendar.interface'

const UpcomingScreen: ScreenFComponent = () => {
  const calendar = useShallowSelector(state => state.sonarr.entities.calendar)
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_calendar(),
    state => state.sonarr.result.calendar
  )
  return (
    <ABackground>
      <Container>
        <FlatList
          onRefresh={doRefresh}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          data={result}
          renderItem={renderItem(calendar)}
        />
      </Container>
    </ABackground>
  )
}

const keyExtractor = (key: number) => key.toString()
const renderItem = (upcoming: IEntity<CalendarValue>) => ({ item }: any) => (
  <CalendarItem upcoming={upcoming[item]} />
)

const Container = styled.View`
  padding-top: 10;
`

export default UpcomingScreen
