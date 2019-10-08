import { do_navigate_back } from '@actions/navigation.actions'
import ABackground from '@common/Background.component'
import AFAB from '@common/FAB.component.tsx'
import AText from '@common/Text.component'
import { Ionicons } from '@expo/vector-icons'
import { useADispatchC } from '@utils/recipes.util'
import { ScreenFComponent } from '@utils/types.util'
import React from 'react'
import styled from 'styled-components/native'

const MovieInfo: ScreenFComponent = () => {
  const back = useADispatchC(do_navigate_back())

  return (
    <ABackground>
      <Container>
        <Text>asdasd</Text>
      </Container>
      <AFAB position="top-left" onPress={back}>
        <Ionicons name="md-close" color="white" size={32} />
      </AFAB>
    </ABackground>
  )
}

const Container = styled.View``
const Text = styled(AText)``

export default MovieInfo
