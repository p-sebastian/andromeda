import React from 'react'
import styled from 'styled-components/native'
import ABackground from '@common/Background.component'
import AText from '@common/Text.component'

type Props = { animEnd: boolean }
const MovieInfo: React.FC<Props> = () => {
  return (
    <ABackground>
      <Container>
        <Text>asdasd</Text>
      </Container>
    </ABackground>
  )
}

const Container = styled.View``
const Text = styled(AText)``

export default MovieInfo
