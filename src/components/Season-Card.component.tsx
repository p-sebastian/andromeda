import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@utils/dimensions.util'
import { BORDER_RADIUS, BOX_SHADOW, MARGIN } from '@utils/position.util'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS } from '@utils/constants.util'
import { GradientEnum } from '@utils/enums.util'
import { IEpisode } from '@interfaces/episode.interface'

type Props = { episodes: IEpisode[] }
const SeasonCard: React.FC<Props> = ({}) => {
  const gradient = GRADIENTS[GradientEnum.ORANGE]
  return (
    <Container>
      <Border>
        <Gradient {...gradient}>
          <Text>asdas</Text>
        </Gradient>
      </Border>
    </Container>
  )
}

const Container = styled.View`
  width: ${SCREEN_WIDTH * 0.5};
  height: ${SCREEN_HEIGHT * 0.375 -
    MARGIN}; /* 0.375 lines with the bottom drawer*/
  margin-left: ${SCREEN_WIDTH * 0.1};
  margin-right: ${SCREEN_WIDTH * 0.1};
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
`
const Text = styled.Text``

export default SeasonCard
