import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@utils/dimensions.util'
import { BORDER_RADIUS, BOX_SHADOW } from '@utils/position.util'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS } from '@utils/constants.util'
import { GradientEnum } from '@utils/enums.util'
import { IEpisode } from '@interfaces/episode.interface'

type Props = { episodes: IEpisode[] }
const SeasonCard: React.FC<Props> = ({}) => {
  const gradient = GRADIENTS[GradientEnum.ORANGE]
  return (
    <Container>
      <Gradient {...gradient}>
        <Text>asdas</Text>
      </Gradient>
    </Container>
  )
}

const Container = styled.View`
  margin-left: ${SCREEN_WIDTH * 0.1};
  margin-right: ${SCREEN_WIDTH * 0.1};
  height: 100%;
  bottom: ${SCREEN_HEIGHT * 0.125};
  border-radius: ${BORDER_RADIUS};
  box-shadow: ${BOX_SHADOW};
  position: relative;
`
const Gradient = styled(LinearGradient)`
  width: ${SCREEN_WIDTH * 0.5};
  height: 100%;
`
const Text = styled.Text``

export default SeasonCard
