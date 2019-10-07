import AText from '@common/Text.component'
import React from 'react'
import Picker from 'react-native-picker-select'
import styled from 'styled-components/native'

type Props = {
  label: string
  items: { label: string; value: any }[]
  onChange?: (value: any, index: number) => void
}
const APicker: React.FC<Props> = ({ label, items, onChange = () => {} }) => {
  return (
    <Container>
      <Text>{label}</Text>
      <SPicker placeholder={{}} items={items} onValueChange={onChange} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  border-bottom-width: 1;
  border-bottom-color: white;
`
const SPicker = styled(Picker)`
  flex: 1;
`
const Text = styled(AText)`
  color: white;
  font-size: 16;
  padding-bottom: 4;
  padding-top: 1;
`

export default APicker
