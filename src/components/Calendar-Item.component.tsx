import PosterItem from '@common/Poster-Item.component'
import AText from '@common/Text.component'
import { CalendarValue } from '@interfaces/calendar.interface'
import { FONT, GRADIENTS } from '@utils/constants.util'
import { GradientEnum, ServerEnum } from '@utils/enums.util'
import { useShallowSelector } from '@utils/recipes.util'
import { isUndefined } from 'lodash'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components/native'

type Props = { upcoming: CalendarValue }
const CalendarItem: React.FC<Props> = ({ upcoming }) => {
  const {
    tvdbId,
    title,
    seasonNumber,
    episodeNumber,
    airDate,
    hasFile
  } = upcoming
  const series = useShallowSelector(
    state => state.sonarr.entities.series[tvdbId]
  )
  // calendar might load before geting shows, so series might be empty
  if (isUndefined(series)) {
    return <Container />
  }
  const gradient = hasFile
    ? GRADIENTS[GradientEnum.GREEN]
    : GRADIENTS[GradientEnum.BLUE]
  return (
    <PosterItem
      gradient={gradient}
      title={series.title}
      id={series.id}
      tdbid={tvdbId}
      serverKey={ServerEnum.SONARR}
      flexDirection="column"
      justifyContent="flex-start"
      screen="showinfo"
      screenTitle="Info"
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
  font-family: ${FONT.italic};
  align-self: flex-end;
  font-size: 12;
`

export default React.memo(CalendarItem)
