import React, { Component } from 'react'
import { IMatchBoxProps } from './IMatchBox'
import './matchbox.scss'

export class MatchBox extends Component<IMatchBoxProps> {
  constructor (props: IMatchBoxProps) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='matchbox-body'>
        <p>
          {this.props.box?.clubATeam !== undefined ? this.props.box.clubATeam + ' gegen ' : null}
          {this.props.box?.clubBTeam !== undefined ? this.props.box.clubBTeam + ' am ' : null}
          {this.props.box?.gameDay !== undefined ? this.props.box.gameDay : null}
        </p>
      </div>
    )
  }
}
