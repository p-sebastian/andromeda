import { do_api_sonarr_get_episodes } from '@actions/api.actions'
import {
  do_action_sheet_open,
  do_clear_episodes
} from '@actions/general.actions'
import { do_navigate_back } from '@actions/navigation.actions'
import ABackground from '@common/Background.component'
import BottomDrawer from '@common/Bottom-Drawer.component'
import AFAB from '@common/FAB.component.tsx'
import AText from '@common/Text.component'
import EpisodeItem from '@components/Episode-Item.component'
import SeasonCard from '@components/Season-Card.component'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useUpdate } from '@hooks/useUpdate'
import { ISeriesValue } from '@interfaces/common.interface'
import { IEpisode } from '@interfaces/episode.interface'
import { COLORS, FONT } from '@utils/constants.util'
import { GRADIENTS } from '@utils/constants.util'
import { OFFSET, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { ColorEnum } from '@utils/enums.util'
import { GradientEnum } from '@utils/enums.util'
import { byteToGB } from '@utils/helpers.util'
import { logger } from '@utils/logger.util'
import { BORDER_RADIUS, BOX_SHADOW, MARGIN } from '@utils/position.util'
import { useADispatch, useShallowSelector } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import { LinearGradient } from 'expo-linear-gradient'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SwipeListView } from 'react-native-swipe-list-view'
import styled from 'styled-components/native'

const MAIN_WIDTH = SCREEN_WIDTH - OFFSET
const WIDTH = MAIN_WIDTH * 0.25
const POSTER_HEIGHT = WIDTH / 0.69
const B_GROUP_WIDTH = MAIN_WIDTH * 0.75 - MARGIN * 2
const B_GROUP_HEIGHT = POSTER_HEIGHT * 0.5
const G = GRADIENTS[GradientEnum.SEASONS]

type Params = {
  id: number
  tdbid: number
  posterReq: { uri: string; headers: { [key: string]: string } }
  fanartReq: { uri: string; headers: { [key: string]: string } }
}

const ShowInfoScreen: ScreenFComponent = ({ navigation }) => {
  const { id, tdbid, posterReq, fanartReq } = navigation.state.params as Params
  const update = useUpdate(tdbid)
  const dispatch = useADispatch()
  const episodes = useEpisodes(id)
  const [isSelected, setIsSelected] = useState<{ [key: number]: boolean }>({})
  const [onViewIndex, setOnViewIndex] = useState(0)
  const noSpecial = useRef(0)
  const show = useShallowSelector(state => state.sonarr.entities.series[tdbid])
  const keys = Object.keys(episodes).map(Number)
  const data = keys.slice().reverse()
  const selected = (episodes[onViewIndex + noSpecial.current] || [])
    .slice()
    .reverse()
  const offsets = data.map(k => MAIN_WIDTH * 0.84 * (k - noSpecial.current))
  // Episodes toggled true
  const episodesSelected = Object.values(isSelected).filter(Boolean).length
  const { monitored } = show
  const bookmark = monitored ? 'bookmark' : 'bookmark-border'

  const toggle = (key: number) =>
    setIsSelected({ ...isSelected, [key]: !isSelected[key] })

  // runs when it has episodes; 2 times
  useEffect(() => {
    if (!isEmpty(episodes)) {
      // seasonNumber = 0; means specials season.
      noSpecial.current = keys.findIndex(k => k === 0) < 0 ? 1 : 0
      // start on last season
      setOnViewIndex(data.length - 1)
    }
  }, [JSON.stringify(keys)])

  /**
   * targetContentOffset.x, is the distance it has moved, since all
   * elements are the size of the screen width, diving it by the width
   * gets the current on view item index in the list
   */
  const onScrollEndDrag = useCallback(
    (e: any) => {
      // clears on season change
      setIsSelected({})
      setOnViewIndex(
        offsets.findIndex(
          // within +/- 1
          v => Math.abs(e.nativeEvent.targetContentOffset.x - v) <= 1
        )
      )
    },
    [JSON.stringify(offsets)]
  )
  return (
    <ABackground>
      <FanartView>
        <Img source={fanartReq} />
      </FanartView>
      <TopContent>
        <Title>{show.title}</Title>
      </TopContent>
      <BottomContent>
        <PosterView>
          <Poster source={posterReq} />
        </PosterView>
        <ButtonGroup>
          <ForGradient>
            <Gradient {...G}>
              <Button>
                <Icon name="md-sync" size={28} />
              </Button>
              <Button>
                <Icon name="md-create" size={28} />
              </Button>
              <Button>
                <MaterialIcons
                  name={bookmark}
                  color={COLORS[ColorEnum.MAIN]}
                  onPress={() => update()}
                  size={28}
                />
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
            renderItem={renderItem(episodes, show)}
            decelerationRate={0}
            snapToOffsets={offsets}
            snapToAlignment={'center'}
            onScrollEndDrag={onScrollEndDrag}
            inverted
            ListHeaderComponent={Empty}
            ListFooterComponent={Empty}
          />
        </ListContainer>
        <BottomDrawer>
          <SwipeListView
            extraData={isSelected}
            keyExtractor={episodeKeyExtract}
            data={selected}
            renderItem={renderEpisodes(toggle, isSelected)}
            directionalLockEnabled
          />
          {episodesSelected ? (
            <AFAB
              onPress={() =>
                dispatch(do_action_sheet_open(actionSheetOptions()))
              }
              position="bottom-left"
            >
              <FabText>{episodesSelected}</FabText>
            </AFAB>
          ) : null}
        </BottomDrawer>
      </BottomContent>
      <AFAB
        fullscreen
        position="top-left"
        onPress={() => dispatch(do_navigate_back())}
      >
        <Ionicons name="md-close" color="white" size={32} />
      </AFAB>
    </ABackground>
  )
}
ShowInfoScreen.navigationOptions = {
  gesturesEnabled: false,
  header: null
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
  show: ISeriesValue
) => ({ item }: any) => (
  <SeasonCard
    tvdbId={show.tvdbId}
    season={show.seasons.find(s => s.seasonNumber === Number(item))!}
    episodes={episodes[item]}
  />
)

const episodeKeyExtract = ({ id }: IEpisode) => id.toString()
const renderEpisodes: (
  toggle: any,
  isSelected: { [key: number]: boolean }
) => ListRenderItem<IEpisode> = (toggle, isSelected) => ({ item }) => (
  <EpisodeItem
    episode={item}
    toggle={toggle}
    isSelected={!!isSelected[item.id]}
  />
)
const info = ({ year, sizeOnDisk, network }: ISeriesValue) => {
  const size = byteToGB(sizeOnDisk)
  return `${year} - ${network} - ${sizeOnDisk ? size + 'GB' : '--'}`
}

const actionSheetOptions = (isSeason = false) =>
  isSeason
    ? {
        title: 'Manage Season',
        options: ['search all monitored', 'delete all']
      }
    : {
        title: 'Selected Episodes',
        options: ['force search', 'delete']
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
const Img = styled(FastImage)`
  flex: 1;
  opacity: 0.4;
`
const Poster = styled(Img)`
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
  font-family: ${FONT.bold};
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
  /* quantities are the percentages
   * 0.08 = (1 - (CardWidth + Margins(left,right))) / 2
   * the divided by 2 is because its one size of 2
   */
  width: ${MAIN_WIDTH * 0.08};
`
const Text = styled(AText)`
  color: white;
  font-family: ${FONT.italic};
`
const FabText = styled.Text`
  color: white;
  font-size: 18;
  font-family: ${FONT.bold};
`

export default ShowInfoScreen
