import ABackground from '@common/Background.component'
import APicker from '@common/Picker.component'
import AText from '@common/Text.component'
import { IRawSeries } from '@interfaces/common.interface'
import { COLORS, FONT } from '@utils/constants.util'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { ColorEnum } from '@utils/enums.util'
import { logger } from '@utils/logger.util'
import { BORDER_RADIUS, BOX_SHADOW, MARGIN } from '@utils/position.util'
import { useASelector } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import { capitalize } from 'lodash'
import React, { useState } from 'react'
import styled from 'styled-components/native'

const WIDTH = SCREEN_WIDTH * 0.25
const POSTER_HEIGHT = WIDTH / 0.69

// profile
// rootFolder
/*
 * {
 * seasonFolder: boolean,
 * seriesType: 'standard' | 'daily' | 'anime'
 * }
 *
 * */
type Params = {
  series: IRawSeries<{ coverType: string; url: string }>
  posterReq: { uri: string }
  fanartReq: { uri: string }
}
const AddInfoScreen: ScreenFComponent = ({ navigation }) => {
  const [profiles, paths, monitor, seriesType] = useData()
  const [folders, setFolders] = useState(false)
  const { posterReq, fanartReq, series } = navigation.state.params as Params

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
        <InfoView>
          <Text>{info(series)}</Text>
        </InfoView>
        <Content>
          <Pairs>
            <APicker label="Profiles" onChange={() => {}} items={profiles} />
            <APicker label="Path" onChange={() => {}} items={paths} />
          </Pairs>
          <Pairs>
            <APicker label="Monitor" onChange={() => {}} items={monitor} />
            <APicker
              label="Series Type"
              onChange={() => {}}
              items={seriesType}
            />
          </Pairs>
          <Pairs>
            <SwitchText>Use Season Folders</SwitchText>
            <Switch value={folders} onValueChange={setFolders} />
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
  const mappedPaths = paths.map(p => ({ label: p.path, value: p.id }))
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

const info = ({
  year,
  network,
  status
}: IRawSeries<{ coverType: string; url: string }>) => {
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
const InfoView = styled.View`
  position: absolute;
  right: ${MARGIN};
  height: ${POSTER_HEIGHT * 0.25};
  top: ${POSTER_HEIGHT * 0.125};
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
