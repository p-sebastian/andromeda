import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron.configure({
  name: 'Andromeda',
  port: 9090,
  host: '10.0.1.9'
})
  .use(reactotronRedux())
  .useReactNative({
    errors: { veto: stackFrame => false } // or turn it off with false
  })
  .connect()

export default reactotron
