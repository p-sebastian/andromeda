import React from 'react'
import styled from 'styled-components/native'
import { useASelector } from '@utils/recipes.util'

const SettingsScreen: React.FC = () => {
  // const title = useASelector(state => state.theme.title)
  return (
    <Container>
      <STitle>some text</STitle>
    </Container>
  )
}

const Container = styled.View``
const STitle = styled.Text``

export default SettingsScreen
