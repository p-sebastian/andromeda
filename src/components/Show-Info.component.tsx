import React from 'react'
import styled from 'styled-components/native'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'
import { logger } from '@utils/logger.util'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions.util'
import { Image } from 'react-native-expo-image-cache'
import { COLORS } from '@utils/constants.util'
import { ColorEnum } from '@utils/enums.util'
import { BOX_SHADOW, BORDER_RADIUS, MARGIN } from '@utils/position.util'
import { useShallowSelector } from '@utils/recipes.util'
import BottomDrawer from '@common/Bottom-Drawer.component'

const WIDTH = SCREEN_WIDTH * 0.25

type Props = { seriesId: number; posterUri: string; fanartUri: string }
const ShowInfo: React.FC<Props> = ({ seriesId, posterUri, fanartUri }) => {
  const show = useShallowSelector(
    state => state.sonarr.entities.series[seriesId]
  )
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
        <BottomDrawer />
      </BottomContent>
    </ABackground>
  )
}

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

export default ShowInfo
