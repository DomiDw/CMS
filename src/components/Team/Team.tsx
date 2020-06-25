import React, { ReactNode, Component } from 'react'
import { ITeamProps } from './ITeam'
import './team.scss'

export class Team extends Component<ITeamProps> {
  teamHome: ReactNode
  teamGuest: ReactNode
  scoreHome: ReactNode
  scoreGuest: ReactNode
  // xsSize: string | undefined
  // smSize: string | undefined
  // mdSize: string | undefined
  // lgSize: string | undefined
  // size:string = ''
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

  // setSize () {
  //   if (this.props.size?.xs !== undefined) {
  //     this.xsSize = `col-xs-${this.props.size?.xs}`
  //   } else {
  //     this.xsSize = ''
  //   }
  //   if (this.props.size?.sm !== undefined) {
  //     this.smSize = ` col-sm-${this.props.size?.sm}`
  //   } else {
  //     this.smSize = ''
  //   }
  //   if (this.props.size?.md !== undefined) {
  //     this.mdSize = ` col-md-${this.props.size?.md}`
  //   } else {
  //     this.mdSize = ''
  //   }
  //   if (this.props.size?.lg !== undefined) {
  //     this.lgSize = ` col-lg-${this.props.size?.lg}`
  //   } else {
  //     this.lgSize = ''
  //   }

  //   if (this.props.size !== undefined) {
  //     this.size = `${this.xsSize}${this.smSize}${this.mdSize}${this.lgSize}`
  //   }
  // }

  render () {
    this.setTeamHome()
    this.setTeamGuest()
    this.setScoreHome()
    this.setScoreGuest()
    // this.setSize()
    return (
      // <div className={this.size}>
      <div className='team-block'>
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
      // </div>
    )
  }
}
