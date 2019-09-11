import React, { useMemo, useState } from 'react'
import { FlatList, SectionList, SectionListData } from 'react-native'
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
import moment from 'moment'
import { logger } from '@utils/logger.util'
import { BOX_SHADOW, BORDER_RADIUS } from '@utils/position.util'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { ExpansionContext } from '../../context/Expansion.context'

const UpcomingScreen: ScreenFComponent = () => {
  const [dimensions, setDimensions] = useState({
    offsetX: 0,
    offsetY: 0,
    elmHeight: 0,
    selected: false
  })
  const calendar = useShallowSelector(state => state.sonarr.entities.calendar)
  const [result, refreshing, doRefresh] = useApi(
    do_api_sonarr_get_calendar(),
    state => state.sonarr.result.calendar
  )
  const data = useMemo(() => arrangeSections(result, calendar), [result])
  return (
    <ABackground>
      <ExpansionContext.Provider value={{ dimensions, setDimensions } as any}>
        <SectionList
          onRefresh={doRefresh}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          sections={data}
          renderItem={renderItem(calendar)}
        />
      </ExpansionContext.Provider>
    </ABackground>
  )
}

const keyExtractor = (key: number) => key.toString()
const renderItem = (upcoming: IEntity<CalendarValue>) => ({ item }: any) => (
  <CalendarItem upcoming={upcoming[item]} />
)
type RenderSectionHeader = (info: { section: SectionListData<any> }) => any
const renderSectionHeader: RenderSectionHeader = ({ section: { title } }) => (
  <Header>
    <Title>{title}</Title>
  </Header>
)

const arrangeSections = (
  result: number[],
  calendar: IEntity<CalendarValue>
) => {
  const today = moment().startOf('day')
  const data: { [key: string]: number[] } = {}

  result.forEach(key => {
    const date = moment(calendar[key].airDateUtc)
    const d = date.endOf('day').diff(today, 'days')
    if (d === 0) {
      data['Today'] = [key].concat((data['Today'] as any) || [])
    } else if (d === 1) {
      data['Tomorrow'] = [key].concat((data['Tomorrow'] as any) || [])
    } else {
      const day = date.format('dddd')
      data[day] = [key].concat((data[day] as any) || [])
    }
  })
  return Object.keys(data).map(key => ({ title: key, data: data[key] }))
}

const Header = styled.View`
  background: ${COLORS[ColorEnum.GRAY]};
  height: 40;
  width: 100%;
  box-shadow: ${BOX_SHADOW};
  margin-bottom: 15;
  justify-content: center;
  border-radius: ${BORDER_RADIUS};
`
const Title = styled(AText)`
  color: white;
  font-family: oswald-semibold;
  padding-left: 10;
`

export default UpcomingScreen
