import React from 'react'
import styled from 'styled-components/native'
import { useASelector } from '@utils/recipes.util'

const HomeScreen: React.FC = () => {
  const title = useASelector(state => state.theme.title)
  return (
    <Container>
      <STitle>{title}</STitle>
    </Container>
  )
}

const Container = styled.View``
const STitle = styled.Text``

export default HomeScreen
