import React from 'react'
// import AHeader from '@common/Header.component'
import { View, Text } from 'react-native'
// import { render } from '@testing-library/react-native'

// import renderer from 'react-test-renderer'
import { withRedux } from '../../testing.utils'

const Test: React.FC = () => (
  <View>
    <Text>Holaa</Text>
  </View>
)

describe('<AHeader/>', () => {
  it('renders', () => {
    const { container } = withRedux(<Test />)
    expect(container).toMatchSnapshot()
  })
})
