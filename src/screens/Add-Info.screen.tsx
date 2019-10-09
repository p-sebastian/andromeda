import { do_api_sonarr_post_series } from '@actions/api.actions'
import ABackground from '@common/Background.component'
import APicker from '@common/Picker.component'
import AText from '@common/Text.component'
import { Ionicons } from '@expo/vector-icons'
import { IRawSeries } from '@interfaces/common.interface'
import { COLORS, FONT, GRADIENTS } from '@utils/constants.util'
import { OFFSET, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { ColorEnum, GradientEnum } from '@utils/enums.util'
import { BORDER_RADIUS, BOX_SHADOW, MARGIN } from '@utils/position.util'
import { useADispatch, useASelector } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import { LinearGradient } from 'expo-linear-gradient'
import { capitalize } from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

const WIDTH = SCREEN_WIDTH * 0.25
const POSTER_HEIGHT = WIDTH / 0.69
const B_GROUP_WIDTH = (SCREEN_WIDTH - OFFSET) * 0.6 - MARGIN * 2
const B_GROUP_HEIGHT = POSTER_HEIGHT * 0.5
const G = GRADIENTS[GradientEnum.SEASONS]

type Series = IRawSeries<{ coverType: string; url: string }>
type Params = {
  series: Series
  posterReq: { uri: string }
  fanartReq: { uri: string }
}
const AddInfoScreen: ScreenFComponent = ({ navigation }) => {
  const { posterReq, fanartReq, series } = navigation.state.params as Params
  const dispatch = useADispatch()
  const [profiles, paths, monitor, seriesType] = useData()
  // on first app load profiles will be empty,
  const [form, onPress] = useForm(
    profiles.length ? profiles[0].value : 0,
    paths.length ? paths[0].value : '',
    seriesType[0].value
  )
  // on Update or first load
  useEffect(() => {
    onPress('profileId')(profiles[0].value)
  }, [JSON.stringify(profiles)])
  useEffect(() => {
    onPress('rootFolderPath')(paths[0].value)
  }, [JSON.stringify(paths)])
  const [options, seasons, onMonitorPress] = useOptions(series)

  const onAdd = (search = false) => () => {
    const body = {
      ...series,
      ...form,
      seasons,
      addOptions: { ...options, searchForMissingEpisodes: search }
    }
    dispatch(do_api_sonarr_post_series(body))
  }

  return (
    <ABackground>
      <FanartView>
        <Img source={fanartReq} />
      </FanartView>
      <TopContent>
        <Title>{series.title}</Title>
      </TopContent>
      <BottomContent>
        <PosterView>
          <Poster source={posterReq} />
        </PosterView>
        <ButtonGroup>
          <ForGradient>
            <Gradient {...G}>
              <Button onPress={onAdd()}>
                <Icon name="md-add" size={28} />
              </Button>
              <Button onPress={onAdd(true)}>
                <Icon name="md-search" size={28} />
              </Button>
            </Gradient>
          </ForGradient>
        </ButtonGroup>
        <InfoView>
          <Text>{info(series)}</Text>
        </InfoView>
        <Content>
          <Pairs>
            <APicker
              label="Profiles"
              onChange={onPress('profileId')}
              items={profiles}
            />
            <APicker
              label="Path"
              onChange={onPress('rootFolderPath')}
              items={paths}
            />
          </Pairs>
          <Pairs>
            <APicker
              label="Monitor"
              onChange={onMonitorPress}
              items={monitor}
            />
            <APicker
              label="Series Type"
              onChange={onPress('seriesType')}
              items={seriesType}
            />
          </Pairs>
          <Pairs>
            <SwitchText>Use Season Folders</SwitchText>
            <Switch
              value={form.seasonFolder}
              onValueChange={onPress('seasonFolder')}
            />
          </Pairs>
        </Content>
      </BottomContent>
    </ABackground>
  )
}

const useData = () => {
  const profiles = useASelector(state => state.temp.profiles)
  const paths = useASelector(state => state.temp.paths)
  const mappedProfiles = profiles.map(p => ({ label: p.name, value: p.id }))
  const mappedPaths = paths.map(p => ({ label: p.path, value: p.path }))
  const monitor = [
    { label: 'All', value: 'all' },
    { label: 'Missing', value: 'missing' },
    { label: 'Existing', value: 'existing' },
    { label: 'First Season', value: 'first' },
    { label: 'Last Season', value: 'last' },
    { label: 'None', value: 'none' }
  ]
  const seriesType = [
    { label: 'Standard', value: 'standard' },
    { label: 'Daily', value: 'daily' },
    { label: 'Anime', value: 'anime' }
  ]
  return [mappedProfiles, mappedPaths, monitor, seriesType] as [
    typeof mappedProfiles,
    typeof mappedPaths,
    typeof monitor,
    typeof seriesType
  ]
}
const useOptions = ({ seasons }: Series) => {
  const [options, setOptions] = useState({
    ignoreEpisodesWithFiles: false,
    ignoreEpisodesWithoutFiles: false
  })
  const [_seasons, setSeasons] = useState(JSON.parse(
    JSON.stringify(seasons)
  ) as typeof seasons)

  const onMonitorPress = (value: string) => {
    /*
     * Only first & last change the monitored boolean
     * the rest are managed by addOptions
     * */
    const copy: typeof seasons = JSON.parse(JSON.stringify(seasons))
    if (value === 'first') {
      copy.map(s => (s.monitored = false))
      // seasonNumber === 0; means that its an special season
      copy[0].seasonNumber === 0
        ? (copy[1].monitored = true)
        : (copy[0].monitored = true)
    }
    if (value === 'last') {
      copy.map(s => (s.monitored = false))
      copy[copy.length - 1].monitored = true
    }
    if (value === 'none') {
      copy.map(s => (s.monitored = false))
    }
    if (value === 'future') {
      setOptions({
        ignoreEpisodesWithoutFiles: true,
        ignoreEpisodesWithFiles: true
      })
    }
    if (value === 'missing') {
      setOptions({
        ignoreEpisodesWithoutFiles: false,
        ignoreEpisodesWithFiles: true
      })
    }
    if (value === 'existing') {
      setOptions({
        ignoreEpisodesWithoutFiles: true,
        ignoreEpisodesWithFiles: false
      })
    }
    if (['none', 'all', 'first', 'last'].some(v => v === value)) {
      setOptions({
        ignoreEpisodesWithoutFiles: false,
        ignoreEpisodesWithFiles: false
      })
    }
    setSeasons(copy)
  }

  return [options, _seasons, onMonitorPress] as [
    typeof options,
    typeof seasons,
    typeof onMonitorPress
  ]
}
const useForm = (
  profileId: number,
  rootFolderPath: string,
  seriesType: string
) => {
  const [form, setForm] = useState({
    profileId,
    rootFolderPath,
    seriesType,
    seasonFolder: true,
    monitored: true
  })

  const onChange = (which: keyof typeof form) => (value: any) => {
    setForm({ ...form, [which]: value })
  }

  return [form, onChange] as [typeof form, typeof onChange]
}

const info = ({ year, network, status }: Series) => {
  return `${year} - ${network} - ${capitalize(status)}`
}

const Text = styled(AText)`
  color: white;
  font-family: ${FONT.italic};
`
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
const Img = styled.Image`
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
const InfoView = styled.View`
  position: absolute;
  right: ${MARGIN};
  height: ${B_GROUP_HEIGHT * 0.5};
  top: ${B_GROUP_HEIGHT * 0.5};
  justify-content: center;
`
const Content = styled.View`
  flex: 1;
  top: ${POSTER_HEIGHT * 0.75};
  padding-left: ${MARGIN};
  padding-right: ${MARGIN};
`
const Pairs = styled.View`
  width: 100%;
  height: 60;
  flex-direction: row;
`
const Switch = styled.Switch`
  align-self: center;
`
const SwitchText = styled(AText)`
  flex: 1;
  color: white;
  align-self: center;
  font-size: 16;
`

export default AddInfoScreen
