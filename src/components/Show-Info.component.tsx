import React, { useEffect, useState, useCallback, useRef } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { SwipeListView } from 'react-native-swipe-list-view'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'
import AFAB from '@common/FAB.component.tsx'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { Image } from 'react-native-expo-image-cache'
import { COLORS, FONT } from '@utils/constants.util'
import { ColorEnum, ThemeEnum } from '@utils/enums.util'
import { BOX_SHADOW, BORDER_RADIUS, MARGIN } from '@utils/position.util'
import { useShallowSelector, useADispatch } from '@utils/recipes.util'
import BottomDrawer from '@common/Bottom-Drawer.component'
import { do_api_sonarr_get_episodes } from '@actions/api.actions'
import {
  do_clear_episodes,
  do_action_sheet_open
} from '@actions/general.actions'
import { IEpisode } from '@interfaces/episode.interface'
import SeasonCard from '@components/Season-Card.component'
import EpisodeItem from './Episode-Item.component'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS } from '@utils/constants.util'
import { GradientEnum } from '@utils/enums.util'
import { Ionicons } from '@expo/vector-icons'
import { ISeriesValue } from '@interfaces/common.interface'
import { THEME } from '@utils/theme.util'
import { isEmpty } from 'lodash'
import { byteToGB } from '@utils/helpers.util'

const WIDTH = SCREEN_WIDTH * 0.25
const POSTER_HEIGHT = WIDTH / 0.69
const B_GROUP_WIDTH = SCREEN_WIDTH * 0.75 - MARGIN * 2
const B_GROUP_HEIGHT = POSTER_HEIGHT * 0.5
const G = GRADIENTS[GradientEnum.SEASONS]

type Props = {
  id: number
  posterReq: { uri: string; headers: { [key: string]: string } }
  fanartReq: { uri: string; headers: { [key: string]: string } }
  animEnd: boolean
}
const ShowInfo: React.FC<Props> = ({ id, fanartReq, posterReq, animEnd }) => {
  const dispatch = useADispatch()
  const episodes = useEpisodes(id)
  const [isSelected, setIsSelected] = useState<{ [key: number]: boolean }>({})
  const [onViewIndex, setOnViewIndex] = useState(0)
  const noSpecial = useRef(0)
  const show = useShallowSelector(state => state.sonarr.entities.series[id])
  const keys = Object.keys(episodes).map(Number)
  const data = keys.slice().reverse()
  const selected = (episodes[onViewIndex + noSpecial.current] || [])
    .slice()
    .reverse()
  const offsets = data.map(k => SCREEN_WIDTH * 0.84 * (k - noSpecial.current))
  // Episodes toggled true
  const episodesSelected = Object.values(isSelected).filter(Boolean).length

  const toggle = (key: number) =>
    setIsSelected({ ...isSelected, [key]: !isSelected[key] })

  useEffect(() => {
    if (!isEmpty(episodes)) {
      // seasonNumber = 0; means specials season.
      noSpecial.current = keys.findIndex(k => k === 0) < 0 ? 1 : 0
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
          v => Math.round(v) === Math.round(e.nativeEvent.targetContentOffset.x)
        )
      )
    },
    [JSON.stringify(offsets)]
  )
  return (
    <ABackground>
      <FanartView>
        <Img uri={fanartReq.uri} options={{ headers: fanartReq.headers }} />
      </FanartView>
      <TopContent>
        <Title>{show.title}</Title>
      </TopContent>
      <BottomContent>
        <PosterView>
          <Fanart
            uri={posterReq.uri}
            options={{ headers: fanartReq.headers }}
          />
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
                <Icon name="md-bookmark" size={28} />
              </Button>
            </Gradient>
          </ForGradient>
        </ButtonGroup>
        <InfoView>
          <Text>{info(show)}</Text>
        </InfoView>
        {animEnd ? (
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
        ) : null}
        <BottomDrawer>
          {animEnd ? (
            <SwipeListView
              extraData={isSelected}
              keyExtractor={episodeKeyExtract}
              data={selected}
              renderItem={renderEpisodes(toggle, isSelected)}
              directionalLockEnabled
            />
          ) : null}
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
  show: ISeriesValue
) => ({ item }: any) => (
  <SeasonCard
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
  width: ${SCREEN_WIDTH * 0.08};
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

export default ShowInfo
