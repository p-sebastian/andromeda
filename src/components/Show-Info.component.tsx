import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'
import { logger } from '@utils/logger.util'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { Image } from 'react-native-expo-image-cache'
import { COLORS } from '@utils/constants.util'
import { ColorEnum, ThemeEnum } from '@utils/enums.util'
import { BOX_SHADOW, BORDER_RADIUS, MARGIN } from '@utils/position.util'
import { useShallowSelector, useADispatch } from '@utils/recipes.util'
import BottomDrawer from '@common/Bottom-Drawer.component'
import { do_api_sonarr_get_episodes } from '@actions/api.actions'
import { do_clear_episodes } from '@actions/general.actions'
import { IEpisode } from '@interfaces/episode.interface'
import SeasonCard from '@components/Season-Card.component'
import EpisodeItem from './Episodes-Item.component'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS } from '@utils/constants.util'
import { GradientEnum } from '@utils/enums.util'
import { Ionicons } from '@expo/vector-icons'
import { ISeriesValue } from '@interfaces/common.interface'
import { THEME } from '@utils/theme.util'

const WIDTH = SCREEN_WIDTH * 0.25
const POSTER_HEIGHT = WIDTH / 0.69
const B_GROUP_WIDTH = SCREEN_WIDTH * 0.75 - MARGIN * 2
const B_GROUP_HEIGHT = POSTER_HEIGHT * 0.5
const G = GRADIENTS[GradientEnum.BUTTONS]

type Props = { seriesId: number; posterUri: string; fanartUri: string }
const ShowInfo: React.FC<Props> = ({ seriesId, posterUri, fanartUri }) => {
  const [onViewIndex, setOnViewIndex] = useState(0)
  const show = useShallowSelector(
    state => state.sonarr.entities.series[seriesId]
  )
  const episodes = useEpisodes(show.id)
  const data = Object.keys(episodes).map(Number)
  const selected = episodes[onViewIndex]
  const offsets = data.map(k => SCREEN_WIDTH * 0.7 * k)
  // @todo start on the last index, make them 70% of screen_width
  /**
   * targetContentOffset.x, is the distance it has moved, since all
   * elements are the size of the screen width, diving it by the width
   * gets the current on view item index in the list
   */
  const onScrollEndDrag = useCallback(
    (e: any) => {
      setOnViewIndex(
        offsets.findIndex(
          v => Math.round(v) === Math.round(e.nativeEvent.targetContentOffset.x)
        )
      )
    },
    [data]
  )
  logger.info(onViewIndex)
  return (
    <ABackground>
      <FanartView>
        <Img uri={fanartUri} />
      </FanartView>
      <TopContent>
        <Title>{show.title}</Title>
      </TopContent>
      <BottomContent>
        <PosterView>
          <Fanart uri={posterUri} />
        </PosterView>
        <ButtonGroup>
          <ForGradient>
            <Gradient {...G}>
              <Button>
                <Icon name="md-sync" color="white" size={28} />
              </Button>
              <Button>
                <Icon name="md-create" color="white" size={28} />
              </Button>
              <Button>
                <Icon name="md-bookmark" color="white" size={28} />
              </Button>
            </Gradient>
          </ForGradient>
        </ButtonGroup>
        <InfoView>
          <Text>{info(show)}</Text>
        </InfoView>
        <ListContainer>
          <FlatList
            keyExtractor={keyExtractor}
            data={data}
            horizontal
            renderItem={renderItem(episodes)}
            decelerationRate={0}
            snapToOffsets={offsets}
            snapToAlignment={'center'}
            onScrollEndDrag={onScrollEndDrag}
            ListHeaderComponent={Empty}
            ListFooterComponent={Empty}
          />
        </ListContainer>
        <BottomDrawer>
          <FlatList
            keyExtractor={episodeKeyExtract}
            data={selected}
            renderItem={renderEpisodes}
          />
        </BottomDrawer>
      </BottomContent>
    </ABackground>
  )
}

const useEpisodes = (id: number) => {
  const episodes = useShallowSelector(state => state.temp.episodes)
  const dispatch = useADispatch()
  useEffect(() => {
    dispatch(do_api_sonarr_get_episodes(id))
    return () => dispatch(do_clear_episodes())
  }, [])
  return episodes
}

const keyExtractor = (key: number) => key.toString()
const renderItem = (episodes: { [key: string]: IEpisode[] }) => ({
  item
}: any) => <SeasonCard episodes={episodes[item]} />

const episodeKeyExtract = ({ id }: IEpisode) => id.toString()
const renderEpisodes: ListRenderItem<IEpisode> = ({ item }) => (
  <EpisodeItem episode={item} />
)
const info = ({ year, sizeOnDisk, network }: ISeriesValue) => {
  const gb = 1073741824
  const size = ((sizeOnDisk || 0) / gb).toFixed(1)
  return `${year} - ${network} - ${sizeOnDisk ? size + 'GB' : '--'}`
}

const FanartView = styled.View`
  height: ${SCREEN_HEIGHT / 2};
`
const PosterView = styled.View`
  position: absolute;
  top: ${-POSTER_HEIGHT * 0.5};
  width: ${WIDTH};
  left: ${MARGIN};
  height: ${POSTER_HEIGHT};
  box-shadow: ${BOX_SHADOW};
`
const Img = styled(Image)`
  flex: 1;
  opacity: 0.4;
`
const Fanart = styled(Img)`
  overflow: hidden;
  opacity: 1;
  border-radius: ${BORDER_RADIUS};
`
const BottomContent = styled.View`
  flex: 1;
  margin-top: ${-SCREEN_HEIGHT * 0.125};
  border-top-right-radius: 50;
  border-top-left-radius: 50;
  background: ${COLORS[ColorEnum.GRAY]};
  box-shadow: ${BOX_SHADOW};
`
const TopContent = styled.View`
  position: absolute;
  top: 0;
  height: ${SCREEN_HEIGHT * 0.375};
  width: 100%;
  justify-content: center;
  align-content: center;
`
const Title = styled(AText)`
  text-align: center;
  font-size: 24;
  font-family: roboto-bold;
  margin-left: ${MARGIN};
  margin-right: ${MARGIN};
  color: white;
`
/**
 * Needed because shadow doesnt work on overflow hidden
 * and gradient needs overflow hidden for border radius
 */
const ForGradient = styled.View`
  flex: 1;
  overflow: hidden;
  border-bottom-left-radius: 50;
  border-top-left-radius: 50;
`
const ButtonGroup = styled.View`
  position: absolute;
  top: ${-B_GROUP_HEIGHT * 0.5};
  height: ${B_GROUP_HEIGHT};
  width: ${B_GROUP_WIDTH};
  border-bottom-left-radius: 50;
  border-top-left-radius: 50;
  right: 0;
  box-shadow: ${BOX_SHADOW};
`
const InfoView = styled.View`
  position: absolute;
  height: ${B_GROUP_HEIGHT * 0.5};
  top: ${B_GROUP_HEIGHT * 0.5};
  width: ${B_GROUP_WIDTH - MARGIN};
  right: ${MARGIN};
  /* align-items: center; */
  justify-content: center;
`
const Gradient = styled(LinearGradient)`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
const Icon = styled(Ionicons)`
  color: ${COLORS[ColorEnum.MAIN]};
`
const Button = styled.TouchableOpacity``
const ListContainer = styled.View`
  flex: 1;
`
const Empty = styled.View`
  width: ${SCREEN_WIDTH * 0.15};
`
const Text = styled(AText)`
  color: white;
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
`

export default ShowInfo
