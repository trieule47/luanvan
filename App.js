import React from 'react';
import { View } from 'react-native';
import { createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './src/component/App';
import RootReducer from './src/Reducers/RootReducer';

// export default function Main() {
//   return <App />
// }
const store = createStore(RootReducer);

class App1 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default App1;