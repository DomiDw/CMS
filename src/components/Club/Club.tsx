import React from 'react'
import { IClubProps } from './IClub'
import './club.scss'

export function Club (props: IClubProps) {
  return (
    <div className='col-xs-12 club'>
      <img className='club-logo' src={props.logo} alt={props.name} />
      <div className='club-content'>
        <h1 className='club-name'>{props.name}</h1>
        <h3 className='club-city'>aus {props.city}</h3>
      </div>
    </div>
  )
}
