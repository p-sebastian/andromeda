import {
  do_api_sonarr_get_paths,
  do_api_sonarr_get_profiles
} from '@actions/api.actions'
import { do_toast_show } from '@actions/general.actions'
import { do_navigate } from '@actions/navigation.actions'
import { IRawSeries } from '@interfaces/common.interface'
import { FONT, GRADIENTS } from '@utils/constants.util'
import { SCREEN_WIDTH } from '@utils/dimensions.util'
import { GradientEnum } from '@utils/enums.util'
import { BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import {
  extractFn,
  useADispatch,
  useADispatchC,
  useASelector
} from '@utils/recipes.util'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import styled from 'styled-components/native'

const WIDTH = SCREEN_WIDTH * 0.25

type Props = { item: IRawSeries<{ coverType: string; url: string }> }
const SearchItem: React.FC<Props> = ({ item }) => {
  const { images, title, tvdbId, status } = item
  const exists = !!useASelector(state => state.sonarr.entities.series[tvdbId])
  const gradient = color(exists, status)
  const posterReq = images
    .filter(i => i.coverType === 'poster')
    .map(i => ({ uri: i.url }))[0]
  const fanartReq = images
    .filter(i => i.coverType === 'fanart')
    .map(i => ({ uri: i.url }))[0]
  const onPress = useNavigate(item, { posterReq, fanartReq }, exists)

  return (
    <Container>
      <Touchable onPress={onPress}>
        <PosterContainer>
          <Poster source={posterReq} />
        </PosterContainer>
        <ContentContainer>
          <Gradient {...gradient}>
            <GradientText>{title}</GradientText>
          </Gradient>
          <InfoView>
            <Fanart source={fanartReq} />
            <Padding></Padding>
          </InfoView>
        </ContentContainer>
      </Touchable>
    </Container>
  )
}

type UseNavigate = (
  item: IRawSeries<{ coverType: string; url: string }>,
  images: any,
  exists: boolean
) => () => void
const useNavigate: UseNavigate = (item, images, exists) => {
  const dispatch = useADispatch()
  const onPress = () => {
    if (exists) {
      return dispatch(do_toast_show('Show already added'))
    }
    dispatch(do_api_sonarr_get_paths())
    dispatch(do_api_sonarr_get_profiles())
    dispatch(
      do_navigate('addinfo', {
        ...images,
        title: 'info',
        series: item
      })
    )
  }
  return onPress
}

const color = (exists: boolean, status: string) => {
  if (exists) {
    return GRADIENTS[GradientEnum.GREEN]
  }
  if (status === 'continuing') {
    return GRADIENTS[GradientEnum.GRAY]
  }
  return GRADIENTS[GradientEnum.RED]
}

const Container = styled.View`
  height: ${WIDTH / 0.69};
  margin-bottom: 15;
  margin-left: 10;
  margin-right: 10;
`
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
`
const Gradient = styled(LinearGradient)`
  border-radius: ${BORDER_RADIUS};
  margin-bottom: 5;
  width: 100%;
  min-height: 40;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  border-width: 1;
  border-color: ${extractFn('colors', a => a[a.length - 1])};
`
const GradientText = styled.Text`
  color: white;
  text-align: center;
  font-family: ${FONT.bold};
  font-size: 14;
`
const PosterContainer = styled.View`
  width: ${WIDTH};
  height: ${WIDTH / 0.69};
  box-shadow: ${BOX_SHADOW};
`
const ContentContainer = styled.View`
  flex: 1;
  position: relative;
  padding-left: 5;
  box-shadow: ${BOX_SHADOW};
`
const Fanart = styled.Image`
  position: absolute;
  border-radius: ${BORDER_RADIUS};
  opacity: 0.2;
  width: 100%;
  height: 100%;
`
const Poster = styled.Image`
  border-radius: ${BORDER_RADIUS};
  flex: 1;
`
const InfoView = styled.View`
  flex: 1;
  position: relative;
  background: hsla(225, 4%, 20%, 1);
  border-radius: ${BORDER_RADIUS};
`
const Padding = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px;
  flex: 1;
  border-radius: ${BORDER_RADIUS};
`
export default React.memo(SearchItem)
