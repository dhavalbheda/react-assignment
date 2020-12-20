import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Main from './Component/Main';
import store from './Redux/store';

const App = () => {
  return <Fragment>
    <Provider store={store}>
      <Main />
    </Provider>
  </Fragment>
}

export default App;
