import PosterItem from '@common/Poster-Item.component'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import { FONT, GRADIENTS } from '@utils/constants.util'
import { GradientEnum, ServerEnum } from '@utils/enums.util'
import { BORDER_RADIUS } from '@utils/position.util'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components/native'

type Props = { series: ISeriesValue }
const SeriesItem: React.FC<Props> = ({ series }) => {
  const { tvdbId, id, title, seasonCount } = series
  const gradient = color(series)
  const info = sideText(series)

  return (
    <PosterItem
      gradient={gradient}
      title={title}
      id={id}
      tdbid={tvdbId}
      serverKey={ServerEnum.SONARR}
      screen="showinfo"
      screenTitle="Info"
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
    return GRADIENTS[GradientEnum.GREEN]
  }
  if (status === 'ended' && monitored && episodeFileCount !== episodeCount) {
    // ended & monitored & doesnt have all monitored episodes
    return GRADIENTS[GradientEnum.RED]
  }
  if (!monitored && (status === 'continuing' || status === 'ended')) {
    // continuing || ended but not monitored
    return GRADIENTS[GradientEnum.GRAY]
  }
  return GRADIENTS[GradientEnum.BLUE]
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
  font-family: ${FONT.italic};
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`

export default React.memo(
  SeriesItem,
  (prev, next) => prev.series.sizeOnDisk === next.series.sizeOnDisk
)
