import React, { useEffect, useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'
import { logger } from '@utils/logger.util'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { Image } from 'react-native-expo-image-cache'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { BOX_SHADOW, BORDER_RADIUS, MARGIN } from '@utils/position.util'
import { useShallowSelector, useADispatch } from '@utils/recipes.util'
import BottomDrawer from '@common/Bottom-Drawer.component'
import { do_api_sonarr_get_episodes } from '@actions/api.actions'
import { do_clear_episodes } from '@actions/general.actions'
import { IEpisode } from '@interfaces/episode.interface'
import SeasonCard from '@components/Season-Card.component'

const WIDTH = SCREEN_WIDTH * 0.25

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
  const onScrollEndDrag = useCallback((e: any) => {
    setOnViewIndex(
      offsets.findIndex(
        v => Math.round(v) === Math.round(e.nativeEvent.targetContentOffset.x)
      )
    )
  }, [])
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
        <InfoView />
        <ListContainer>
          <FlatList
            keyExtractor={keyExtractor}
            data={data}
            horizontal
            renderItem={renderItem(episodes, data.length)}
            decelerationRate={0}
            snapToOffsets={offsets}
            snapToAlignment={'center'}
            onScrollEndDrag={onScrollEndDrag}
            ListHeaderComponent={Empty}
            ListFooterComponent={Empty}
          />
        </ListContainer>
        <BottomDrawer>
          <SomeText>asdasd</SomeText>
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
const renderItem = (
  episodes: { [key: string]: IEpisode[] },
  length: number
) => ({ item }: any) => <SeasonCard key={item} episodes={episodes[item]} />

const FanartView = styled.View`
  height: ${SCREEN_HEIGHT / 2};
`
const PosterView = styled.View`
  position: absolute;
  top: ${(-WIDTH * 0.5) / 0.69};
  width: ${WIDTH};
  left: ${MARGIN};
  height: ${WIDTH / 0.69};
  box-shadow: ${BOX_SHADOW};
`
const Img = styled(Image)`
  flex: 1;
  opacity: 0.3;
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
const SomeText = styled(AText)`
  color: black;
`
const ListContainer = styled.View`
  flex: 1;
`
const InfoView = styled.View`
  height: 30%;
`
const Empty = styled.View`
  width: ${SCREEN_WIDTH * 0.15};
`

export default ShowInfo
