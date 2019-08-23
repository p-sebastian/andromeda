import React, { useState } from 'react'
import styled from 'styled-components/native'
import { TextInputProps } from 'react-native'
import { extractProp } from '@utils/recipes.util'
import AText from './Text.component'
import { THEME } from '@utils/theme.util'
import { ThemeEnum, ColorEnum } from '@utils/enums.util'
import { COLORS } from '@utils/constants.util'
import { logger } from '@utils/logger.util'
import { validator } from '@utils/validators.util'

type Extra = {
  textColor?: string
  backgroundColor?: string
  labelColor?: string
  labelText?: string
  validate?: string[]
}
type Fns = {
  readonly isInputValid?: (isValid: boolean) => void
  readonly onChangeText: (text: string, isValid?: boolean) => void
}
type Props = TextInputProps & Extra & Fns
const AInput: React.FC<Props> = props => {
  // @todo dont pass all the props to useValidate
  const [pristine, errors, onChange] = useValidate(props)
  const {
    textColor = 'white',
    backgroundColor = 'transparent',
    labelColor,
    labelText = '',
    placeholderTextColor = COLORS[ColorEnum.PLACEHOLDER],
    ...inputProps
  } = props
  return (
    <Container>
      <Label labelColor={labelColor || textColor}>{labelText}</Label>
      <TextInput
        {...inputProps}
        textColor={textColor}
        backgroundColor={backgroundColor}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChange}
      />
      {!pristine && errors.length ? <ErrorLabel>{errors[0]}</ErrorLabel> : null}
    </Container>
  )
}

const useValidate = ({ onChangeText, validate }: Props) => {
  const [pristine, setPristine] = useState(true)
  const [errors, setErrors] = useState([] as string[])

  const _onChange = (value: string) => {
    const _errors = validator(value, validate)
    setPristine(false)
    if (_errors.length) {
      setErrors(_errors.map(e => e.error))
    }
    onChangeText(value, _errors.length === 0)
  }
  return [pristine, errors, _onChange] as [boolean, string[], typeof _onChange]
}

const Container = styled.View`
  margin-bottom: 5px;
`
const TextInput = styled.TextInput<Props>`
  border-bottom-width: 1;
  border-bottom-color: white;
  height: 40;
  color: ${extractProp<Extra>('textColor')};
  background: ${extractProp<Extra>('backgroundColor')};
  font-family: ${THEME[ThemeEnum.MAIN].fontRegular};
`
const Label = styled(AText)`
  align-self: flex-end;
  color: ${extractProp<Extra>('labelColor')};
  letter-spacing: 2;
  font-size: 14;
  margin-top: 3;
`
const ErrorLabel = styled(AText)`
  font-family: ${THEME[ThemeEnum.MAIN].fontItalic};
  font-size: 10;
  color: ${COLORS[ColorEnum.DANGER]};
  padding-top: 1;
`

export default AInput
