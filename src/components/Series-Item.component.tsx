import React from 'react'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import moment from 'moment'
import { GradientEnum, ThemeEnum, ServerEnum } from '@utils/enums.util'
import { BORDER_RADIUS } from '@utils/position.util'
import { GRADIENTS } from '@utils/constants.util'
import { THEME } from '@utils/theme.util'
import PosterItem from '@common/Poster-Item.component'

type Props = { series: ISeriesValue }
const SeriesItem: React.FC<Props> = ({ series }) => {
  const { id, title, status, seasonCount } = series
  const { gradient, text } = color(series)
  const info = sideText(series)

  return (
    <PosterItem
      gradient={gradient}
      gradientTextColor={text}
      title={title}
      id={id}
      serverKey={ServerEnum.SONARR}
    >
      <Description>
        {seasonCount} {seasonCount > 1 ? 'Seasons' : 'Season'}
      </Description>
      <Description>{info}</Description>
    </PosterItem>
  )
}

const color = ({
  status,
  monitored,
  episodeFileCount,
  episodeCount
}: ISeriesValue) => {
  if (status === 'ended' && episodeFileCount === episodeCount) {
    // ended and has all monitored episodes
    return { gradient: GRADIENTS[GradientEnum.GREEN], text: 'white' }
  }
  if (status === 'ended' && monitored && episodeFileCount !== episodeCount) {
    // ended & monitored & doesnt have all monitored episodes
    return { gradient: GRADIENTS[GradientEnum.RED], text: 'white' }
  }
  if (!monitored && (status === 'continuing' || status === 'ended')) {
    // continuing || ended but not monitored
    return { gradient: GRADIENTS[GradientEnum.GRAY], text: 'white' }
  }
  return { gradient: GRADIENTS[GradientEnum.PURPLE], text: 'white' }
}

const sideText = ({ network, nextAiring }: ISeriesValue) => {
  if (!nextAiring) {
    return network
  }
  const now = moment()
  const next = moment(nextAiring)
  const higher = next.diff(now, 'days') > 6
  const date = higher
    ? next.fromNow()
    : next.calendar(undefined, {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: '[last] dddd',
        nextWeek: 'dddd',
        sameElse: 'L'
      })
  return `${date} on ${network}`
}

const Description = styled(AText)`
  color: white;
  font-size: 12;
  text-align: center;
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`

export default React.memo(
  SeriesItem,
  (prev, next) => prev.series.sizeOnDisk === next.series.sizeOnDisk
)
