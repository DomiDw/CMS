import React, { Component } from 'react'
import { ILinkToSquad } from './ILinkToSquad'
import 'react-dropdown/style.css'
import { Link } from 'react-router-dom'

class LinkToSquad extends Component<ILinkToSquad> {
  options = [
    '1. Herren',
    'Alt-Herren',
    'A-Jugend'
  ]

  constructor (props: ILinkToSquad) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Link to='/aisw-cms-SquadPage'>
        <div>
          {this.options.map(function (name, index) {
            return <button key={index}>{name}</button>
          })}
        </div>
      </Link>
    )
  }
}
export default LinkToSquad
