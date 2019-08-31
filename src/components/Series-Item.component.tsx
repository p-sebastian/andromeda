import React from 'react'
import styled from 'styled-components/native'
import AText from '@common/Text.component'
import { ISeriesValue } from '@interfaces/common.interface'
import { SCREEN_WIDTH } from '@utils/dimensions.util'
import moment from 'moment'
import { useASelector, extractCondition } from '@utils/recipes.util'
import { ServerEnum, GradientEnum, ThemeEnum } from '@utils/enums.util'
import { uriForImage } from '@utils/api.util'
import { selectImage, selectServer } from '@utils/selectors.util'
import { BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS } from '@utils/constants.util'
import { THEME } from '@utils/theme.util'

const WIDTH = SCREEN_WIDTH * 0.25

type Props = { series: ISeriesValue }
const SeriesItem: React.FC<Props> = ({ series }) => {
  const { id, title, status, seasonCount } = series
  const server = useASelector(selectServer(ServerEnum.SONARR))
  const poster = useASelector(selectImage(`${id}-poster`))
  const fanart = useASelector(selectImage(`${id}-fanart`))
  const uri = uriForImage(server, poster)
  const uriFanart = uriForImage(server, fanart)
  const continuing = status === 'continuing'
  const { colors, start, end } = GRADIENTS[
    continuing ? GradientEnum.BLUE : GradientEnum.RED
  ]
  const info = sideText(series)

  return (
    <Container>
      <Poster>
        <Image source={{ uri }} />
      </Poster>
      <ContentContainer>
        <Border>
          <Gradient colors={colors} start={start} end={end}>
            <Text continuing={continuing}>{title}</Text>
          </Gradient>
        </Border>
        <InfoView>
          {/* <BorderFanart> */}
          <Fanart source={{ uri: uriFanart }} />
          {/* </BorderFanart> */}
          <Padding>
            <Description>Seasons: {seasonCount}</Description>
            <Description>{info}</Description>
          </Padding>
        </InfoView>
      </ContentContainer>
    </Container>
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

const Container = styled.TouchableOpacity`
  height: ${WIDTH / 0.69};
  margin-bottom: 15;
  flex-direction: row;
  margin-left: 10;
  margin-right: 10;
`
// individual borders on LinearGradients dont work
const Border = styled.View`
  overflow: hidden;
  border-top-left-radius: ${BORDER_RADIUS};
  border-top-right-radius: ${BORDER_RADIUS};
`
const Gradient = styled(LinearGradient)`
  width: 100%;
  min-height: 40;
  justify-content: center;
  align-items: center;
  box-shadow: none;
`
const ContentContainer = styled.View`
  flex: 1;
  position: relative;
  padding-left: 5;
  box-shadow: ${BOX_SHADOW};
`
const InfoView = styled.View`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: hsla(225, 4%, 20%, 1);
  border-bottom-left-radius: ${BORDER_RADIUS};
  border-bottom-right-radius: ${BORDER_RADIUS};
`
const Padding = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px;
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`
const Description = styled(AText)`
  color: white;
  font-size: 12;
  text-align: center;
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`
const Text = styled(AText)`
  color: ${extractCondition<{ continuing: boolean }, any, any>(
    'continuing',
    THEME[ThemeEnum.MAIN].lighterDark,
    'white'
  )};
  text-align: center;
  font-family: ${THEME[ThemeEnum.MAIN].fontBold};
  font-size: 14;
`
const Poster = styled.View`
  width: ${WIDTH};
  height: ${WIDTH / 0.69};
  box-shadow: ${BOX_SHADOW};
`
const Fanart = styled.Image`
  position: absolute;
  border-bottom-left-radius: ${BORDER_RADIUS};
  border-bottom-right-radius: ${BORDER_RADIUS};
  opacity: 0.2;
  width: 100%;
  height: 100%;
`
const Image = styled.Image`
  border-radius: ${BORDER_RADIUS};
  flex: 1;
`

export default React.memo(SeriesItem)
