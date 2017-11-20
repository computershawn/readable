import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReadableApp from './components/ReadableApp';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';




const store = configureStore({
  "posts": [],
  "categories": [],
  "comments": []
});

ReactDOM.render(
  <Provider store={store}>
    <ReadableApp store={store} />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
