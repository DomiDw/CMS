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
      <div className='col-xs-12'>
        <div className='row'>
          <div className='matchbox-body'>
            <table>
              <tbody>
                {/* <tr>
                  <th> Ihr Verein </th>
                  <th> Gegn. Verein </th>
                  <th> Datum </th>
                </tr> */}
                <tr>
                  <td>
                    {this.props.box?.clubATeam !== undefined && this.props.box.clubATeam}
                  </td>
                  <td>
                    {this.props.box?.clubBTeam !== undefined && this.props.box.clubBTeam}
                  </td>
                  <td>
                    {this.props.box?.gameDay !== undefined && this.props.box.gameDay}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
