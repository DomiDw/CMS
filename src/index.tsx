import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import MatchPage from './components/MatchPage/MatchPage'
import * as serviceWorker from './serviceWorker'
import Discovery from '@soccerwatch/discovery'

Discovery.init(process.env.REACT_APP_Environment || "dev", true)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <MatchPage />
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
  .catch((err:Error) => {
    alert(err);
    console.error(err);
  });

serviceWorker.unregister()