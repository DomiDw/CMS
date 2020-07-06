import React, { ReactNode, Component } from 'react'
import { ITeamProps } from './ITeam'
import './team.scss'

export class Team extends Component<ITeamProps> {
  teamHome: ReactNode
  teamGuest: ReactNode
  scoreHome: ReactNode
  scoreGuest: ReactNode
  scorePoint:string = ':'

  constructor (props: ITeamProps) {
    super(props)
    this.state = {}
  }

  setTeamHome () {
    if (this.props.home !== undefined) {
      this.teamHome =
        <div className='team-home'>
          <img src={this.props.home.thumbnail} alt={this.props.home.name} className='team-img' />
          <div className='team-home-name'>
            {this.props.home.name}
          </div>
        </div>
    } else {
      this.teamHome = <></>
    }
  }

  setTeamGuest () {
    if (this.props.guest !== undefined) {
      this.teamGuest =
        <div className='team-guest end-xs'>
          <div className='team-guest-name'>
            {this.props.guest.name}
          </div>
          <img src={this.props.guest.thumbnail} alt={this.props.guest.name} className='team-img' />
        </div>
    } else {
      this.teamGuest = <></>
    }
  }

  setScoreHome () {
    if (this.props.score?.home !== undefined) {
      this.scoreHome = (
        <>
          <span className='team-home-score'>
            {this.props.score?.home}
          </span>
          <span className='team-scorePoint'>
            {this.scorePoint}
          </span>
        </>
      )
    } else {
      this.scoreHome = <></>
    }
  }

  setScoreGuest () {
    if (this.props.score?.guest !== undefined) {
      this.scoreGuest = (
        <>
          <span className='team-guest-score'>
            {this.props.score?.guest}
          </span>
        </>
      )
    } else {
      this.scoreGuest = <></>
    }
  }

  render () {
    this.setTeamHome()
    this.setTeamGuest()
    this.setScoreHome()
    this.setScoreGuest()
    return (
      <div className='col-xs-12 team-block'>
        {this.props.home !== undefined ? (
          this.teamHome)
          : null}
        {this.props.score?.home !== undefined && this.props.score?.guest !== undefined ? (
          <div className='team-score'>{this.scoreHome}{this.scoreGuest}</div>)
          : null}
        {this.props.guest !== undefined ? (
          this.teamGuest)
          : null}
      </div>
    )
  }
}
