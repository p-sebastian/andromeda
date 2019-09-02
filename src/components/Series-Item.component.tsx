import React, { useContext } from 'react'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import moment from 'moment'
import { GradientEnum, ThemeEnum } from '@utils/enums.util'
import { BORDER_RADIUS } from '@utils/position.util'
import { GRADIENTS } from '@utils/constants.util'
import { THEME } from '@utils/theme.util'
import SonarrListItem from '@common/Sonarr-List-Item.component'

type Props = { series: ISeriesValue }
const SeriesItem: React.FC<Props> = ({ series }) => {
  const { id, title, status, seasonCount } = series
  const continuing = status === 'continuing'
  const gradient =
    GRADIENTS[continuing ? GradientEnum.ORANGE : GradientEnum.RED]
  const gradientTextColor = continuing
    ? THEME[ThemeEnum.MAIN].lighterDark
    : 'white'
  const info = sideText(series)

  return (
    <SonarrListItem
      gradient={gradient}
      gradientTextColor={gradientTextColor}
      title={title}
      seriesId={id}
    >
      <Description>
        {seasonCount} {seasonCount > 1 ? 'Seasons' : 'Season'}
      </Description>
      <Description>{info}</Description>
    </SonarrListItem>
  )
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

export default React.memo(SeriesItem)
