import React from 'react'
import styled from 'styled-components/native'
import { logger } from '@utils/logger.util'
import { GradientEnum, ThemeEnum, ServerEnum } from '@utils/enums.util'
import { BORDER_RADIUS } from '@utils/position.util'
import { GRADIENTS } from '@utils/constants.util'
import PosterItem from '@common/Poster-Item.component'

type Props = { movie: any }
const MovieItem: React.FC<Props> = ({ movie }) => {
  const { id, title } = movie
  const gradient = GRADIENTS[GradientEnum.BLUE]

  return (
    <PosterItem
      id={id}
      title={title}
      gradient={gradient}
      gradientTextColor="white"
      serverKey={ServerEnum.RADARR}
    >
      <Container>
        <Title>asdasd</Title>
      </Container>
    </PosterItem>
  )
}

const Container = styled.View`
  height: 60;
  width: 100%;
`
const Title = styled.Text``

export default React.memo(MovieItem)
