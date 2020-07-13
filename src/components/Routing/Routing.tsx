import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import MatchPage from '../MatchPage/MatchPage'
import ClubPage from '../ClubPage/ClubPage'
import SquadPage from '../SquadPage/SquadPage'

class Routing extends Component<any> {
  constructor (props: any) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/aisw-cms-ClubPage/1' render={() => <ClubPage />} />
            <Route path='/aisw-cms-MatchPage/1'>
              <MatchPage />
            </Route>
            <Route path='/aisw-cms-SquadPage'>
              <SquadPage />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routing
