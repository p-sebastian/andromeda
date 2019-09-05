import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@utils/dimensions.util'
import { BOX_SHADOW, MARGIN } from '@utils/position.util'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS, COLORS } from '@utils/constants.util'
import { GradientEnum, ColorEnum } from '@utils/enums.util'
import { IEpisode } from '@interfaces/episode.interface'
import { MaterialIcons } from '@expo/vector-icons'
import { ISeason } from '@interfaces/common.interface'
import { byteToGB } from '@utils/helpers.util'
import moment from 'moment'

const gradient = GRADIENTS[GradientEnum.SEASONS]
type Props = { episodes: IEpisode[]; season: ISeason }
const SeasonCard: React.FC<Props> = ({ season, episodes }) => {
  const { seasonNumber, statistics, monitored } = season
  const { episodeFileCount, sizeOnDisk, totalEpisodeCount } = statistics!
  const bookmark = monitored ? 'bookmark' : 'bookmark-border'
  const now = moment()
  let unAired = 0
  const monitoredEpisodes = episodes.filter(
    // episode has aired, and is monitored or has already been downloaded
    // which counts as being monitored
    e => {
      const hasAired = now.diff(e.airDateUtc) >= 0
      if (!hasAired) {
        unAired++
      }
      return hasAired && (e.monitored || e.hasFile)
    }
  ).length
  return (
    <Container>
      <Border>
        <Gradient {...gradient}>
          <Top>
            <Button>
              <Icon name="more-vert" size={28} />
            </Button>
            <Title>{title(seasonNumber)}</Title>
            <Button>
              <Icon name={bookmark} size={28} />
            </Button>
          </Top>
          <Center>
            {/* <Text>Monitored episodes</Text> */}
            <Text>
              Monitored: {episodeFileCount}/{monitoredEpisodes}
            </Text>
            {!unAired ? null : <Text>Unaired: {unAired}</Text>}
          </Center>
          <Bottom>
            <BottomText>Total: {totalEpisodeCount}</BottomText>
            <Empty />
            <BottomText>{byteToGB(sizeOnDisk)}GB</BottomText>
          </Bottom>
        </Gradient>
      </Border>
    </Container>
  )
}

const title = (num: number) => (num === 0 ? 'Specials' : `Season ${num}`)

const Container = styled.View`
  width: ${SCREEN_WIDTH * 0.7};
  height: ${SCREEN_HEIGHT * 0.375 -
    MARGIN}; /* 0.375 lines with the bottom drawer*/
  margin-left: ${SCREEN_WIDTH * 0.07};
  margin-right: ${SCREEN_WIDTH * 0.07};
  top: ${SCREEN_HEIGHT * 0.125};
  box-shadow: ${BOX_SHADOW};
`
const Border = styled.View`
  border-radius: 20;
  background: red;
  flex: 1;
  overflow: hidden;
`
const Gradient = styled(LinearGradient)`
  flex: 1;
  padding: ${MARGIN}px;
`
const Top = styled.View`
  justify-content: space-between;
  flex-direction: row;
`
const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Bottom = styled.View`
  flex-direction: row;
`
const Text = styled.Text`
  font-size: 20;
  text-align: center;
  font-family: oswald-semibold;
`
const BottomText = styled(Text)`
  color: ${COLORS[ColorEnum.GRAY]};
  font-size: 18;
`
const Title = styled(Text)`
  flex: 1;
`
const Icon = styled(MaterialIcons)`
  color: ${COLORS[ColorEnum.MAIN]};
`
const Button = styled.TouchableOpacity`
  width: 20%;
  justify-content: center;
  align-items: center;
`
const Empty = styled.View`
  flex: 1;
`

export default React.memo(SeasonCard)
