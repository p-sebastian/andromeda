import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@utils/dimensions.util'
import { BORDER_RADIUS, BOX_SHADOW, MARGIN } from '@utils/position.util'
import { LinearGradient } from 'expo-linear-gradient'
import { GRADIENTS } from '@utils/constants.util'
import { GradientEnum } from '@utils/enums.util'
import { IEpisode } from '@interfaces/episode.interface'

const gradient = GRADIENTS[GradientEnum.SEASONS]
type Props = { episodes: IEpisode[]; season: any }
const SeasonCard: React.FC<Props> = ({ season = {} }) => {
  const { seasonNumber } = season
  return (
    <Container>
      <Border>
        <Gradient {...gradient}>
          <Title>{title(seasonNumber)}</Title>
        </Gradient>
      </Border>
    </Container>
  )
}

const title = (num: number) => (num === 0 ? 'Specials' : `Season ${num}`)

const Container = styled.View`
  width: ${SCREEN_WIDTH * 0.7};
  height: ${SCREEN_HEIGHT * 0.375 -
    MARGIN}; /* 0.375 lines with the bottom drawer*/
  margin-left: ${SCREEN_WIDTH * 0.07};
  margin-right: ${SCREEN_WIDTH * 0.07};
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
const Title = styled.Text`
  width: 100%;
  top: ${MARGIN};
  font-size: 20;
  text-align: center;
  font-family: oswald-semibold;
  /* color: white; */
`

export default React.memo(SeasonCard)
