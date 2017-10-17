import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Router, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import routes from './routes'
import configureStore  from './store/configureStore'


const store = configureStore();
const rootElement = document.getElementById('app');

let ComponentEl;

// if (process.env.NODE_ENV !== 'production') {
//   const DevTools = require('./containers/DevTools').default;

//   // If using routes
//   ComponentEl = (
//     <div>
//       <Router history={browserHistory} routes={routes} />
//       <DevTools />
//     </div>
//   );
// } else {
  ComponentEl = (
    <Router history={browserHistory} routes={routes()} />
  );
// }

// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      {ComponentEl}
    </MuiThemeProvider>
  </Provider>,
  rootElement
);
