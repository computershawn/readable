import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReadableApp from './components/ReadableApp';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
//import { BrowserRouter as Router } from 'react-router-dom'




const store = configureStore({
  "posts": [],
  "categories": [],
  "comments": []
});

ReactDOM.render(
  <Provider store={store}>
    {/* <Router> */}
      <ReadableApp />
      {/* Originally <ReadableApp store={store} /> but might not need to
      include store in this component, it's included in Provider */}
    {/* </Router> */}
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
