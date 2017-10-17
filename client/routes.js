import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/App.js'
import Home from './views/Home.js'
import ReadPage from './views/ReadPage.js'
import Search from './views/Search.js'

export default function () {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='reader' component={ReadPage} />
      <Route path='search' component={Search} />
    </Route>
  );
}
