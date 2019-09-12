import React from 'react'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import PosterItem from '@common/Poster-Item.component'
import { CalendarValue } from '@interfaces/calendar.interface'
import { GRADIENTS } from '@utils/constants.util'
import { GradientEnum, ThemeEnum, ServerEnum } from '@utils/enums.util'
import { useShallowSelector } from '@utils/recipes.util'
import { THEME } from '@utils/theme.util'
import { isUndefined } from 'lodash'
import moment from 'moment'

type Props = { upcoming: CalendarValue }
const CalendarItem: React.FC<Props> = ({ upcoming }) => {
  const {
    seriesId,
    title,
    seasonNumber,
    episodeNumber,
    airDate,
    hasFile
  } = upcoming
  const series = useShallowSelector(
    state => state.sonarr.entities.series[seriesId]
  )
  // calendar might load before geting shows, so series might be empty
  if (isUndefined(series)) {
    return <Container />
  }
  const gradient = hasFile
    ? GRADIENTS[GradientEnum.GREEN]
    : GRADIENTS[GradientEnum.PURPLE]
  const color = hasFile ? THEME[ThemeEnum.MAIN].primary : 'white'
  return (
    <PosterItem
      gradient={gradient}
      gradientTextColor={color}
      title={series.title}
      id={seriesId}
      serverKey={ServerEnum.SONARR}
      flexDirection="column"
      justifyContent="flex-start"
    >
      <Title>{title}</Title>
      <Container>
        <Text>
          {seasonNumber}x{episodeNumber}
        </Text>
        <Text>
          {moment(airDate).format('h:mm a')} on {series.network}
        </Text>
      </Container>
    </PosterItem>
  )
}

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
`
const Title = styled(AText)`
  flex: 1;
  align-self: flex-start;
  color: white;
`
const Text = styled(Title)`
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
  align-self: flex-end;
  font-size: 12;
`

export default React.memo(CalendarItem)
