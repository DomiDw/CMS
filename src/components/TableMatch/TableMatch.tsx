import React, { Component } from 'react'
import { ITableMatchProps } from './ITableMatch'
import './tablematch.scss'
import Discovery from '@soccerwatch/discovery'
import _ from 'lodash'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Spinner } from '../Spinner/Spinner'

export class TableMatch extends Component<ITableMatchProps, any> {
  constructor (props: ITableMatchProps) {
    super(props)
    this.state = {
      loading: true,
      sortDirection: 'asc',
      configTableHeader: [
        { name: 'clubATeam', showName: 'Ihr Verein' },
        { name: 'clubBTeam', showName: 'Gegn. Verein' },
        { name: 'gameDay', showName: 'Datum' }
      ],
      rows: []
    }
  }

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    const pastFirstMatchAPI = Discovery.API_VIDEO + '/meta/41651'
    const pastSecondMatchAPI = Discovery.API_VIDEO + '/meta/41196'
    const res = await Promise.all([
      axios.get(pastFirstMatchAPI),
      axios.get(pastSecondMatchAPI)
    ])
    const pastFirstMatchData = res[0].data
    const pastSecondMatchData = res[1].data
    this.setState({
      rows: [
        {
          clubATeam: pastFirstMatchData.clubATeam,
          clubBTeam: pastFirstMatchData.clubBTeam,
          gameDay: pastFirstMatchData.gameDay
        },
        {
          clubATeam: pastSecondMatchData.clubATeam,
          clubBTeam: pastSecondMatchData.clubBTeam,
          gameDay: pastSecondMatchData.gameDay
        }
      ],
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
  }

  sortArray = (headerString:string) => {
    const { sortDirection, rows } = this.state
    const flipSort = sortDirection === 'asc' ? 'desc' : 'asc'
    const sortedRows = _.orderBy(rows, [headerString], [flipSort])
    this.setState({
      sortDirection: flipSort,
      rows: sortedRows
    })
  }

  render () {
    // TO DO: Double Clicks zum Sortieren
    if (this.state.loading) {
      return (
        <>
          <Spinner text='Spielplan wird geladen...' />
        </>
      )
    }
    return (
      <table>
        <thead>
          <tr>
            {this.state.configTableHeader.map((header:any, i:number) => (
              <th
                key={i}
                onClick={() => this.sortArray(header.name)}
              >
                {header.showName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.rows.map((row: any, i:number) => (
            <tr key={i}>
              <td>
                {row.clubATeam}
              </td>
              <td>
                {row.clubBTeam}
              </td>
              <td>
                {row.gameDay}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
