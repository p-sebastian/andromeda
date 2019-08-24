import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FormContext, TInputValue } from '../../context/Form.context'

export type TInputs = { [key: string]: TInputValue }
type Props = {
  formGroup?: (inputs: TInputs) => void
  isValid?: (isValid: boolean) => void
}
const AForm: React.FC<Props> = ({ children, formGroup, isValid }) => {
  const [inputs, setInputs] = useState({})
  const setValidity = (inputName: string, value: TInputValue) => {
    const _inputs = { ...inputs, [inputName]: value }
    setInputs(_inputs)
    if (formGroup) {
      formGroup(_inputs)
    }
    if (isValid) {
      isValid(_isValid(_inputs))
    }
  }

  return (
    <Container>
      <FormContext.Provider value={{ inputs, setValidity }}>
        {children}
      </FormContext.Provider>
    </Container>
  )
}
const _isValid = (inputs: TInputs) =>
  Object.keys(inputs).every(k => inputs[k].isValid)

const Container = styled.View`
  flex: 1;
`

export default AForm
