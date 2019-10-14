import AText from '@common/Text.component'
import { ICommand } from '@interfaces/command.interface'
import React from 'react'
import styled from 'styled-components/native'

type Props = { command: ICommand }
const TaskItem: React.FC<Props> = ({ command }) => {
  const { name } = command
  return (
    <Container>
      <Text>{name}</Text>
    </Container>
  )
}

const Container = styled.View``
const Text = styled(AText)``

export default TaskItem
