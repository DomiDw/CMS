import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GoToClubPage extends Component<any, any> {
    linkToClub:string = '/aisw-cms-clubpage/' + this.state.clubId
    constructor (props:any) {
      super(props)
      this.state = {
        clubId: 0
      }
    }

    render () {
      return (
        <Link to={this.linkToClub} />
      )
    }
}
export default GoToClubPage
