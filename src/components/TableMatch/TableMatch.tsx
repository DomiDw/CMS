import React, { Component } from 'react'
import { ITableMatchProps } from './ITableMatch'
import './tablematch.scss'
import Discovery from '@soccerwatch/discovery'
import _ from 'lodash'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Spinner } from '../Spinner/Spinner'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

export class TableMatch extends Component<ITableMatchProps, any> {
  constructor (props: ITableMatchProps) {
    super(props)
    this.state = {
      loading: true,
      showPast: false,
      showFuture: false,
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

  showHideTablePast = () => {
    return (
      this.state.showPast === true ? (
        <div className='col-xs-6'>
          <div className='row'>
            <table className='past-games'>
              <caption>PAST</caption>
              <thead>
                <tr>
                  {this.state.configTableHeader.map((header:any, i:number) => (
                    <th
                      key={i}
                      className='sortHeader'
                      onClick={() => this.sortArray(header.name)}
                    >
                      <span>
                        {header.showName}
                        <span className='sortButton'>
                          {this.state.sortDirection === 'asc'
                            ? <ArrowDropDownIcon />
                            : <ArrowDropUpIcon />}
                        </span>
                      </span>
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
          </div>
        </div>
      ) : null
    )
  }

  showHideTableFuture = () => {
    return (
      this.state.showFuture === true ? (
        <div className='col-xs-6'>
          <div className='row'>
            <table className='upcoming-games'>
              <caption>FUTURE</caption>
              <thead>
                <tr>
                  {this.state.configTableHeader.map((header:any, i:number) => (
                    <th
                      key={i}
                      className='sortHeader'
                      onClick={() => this.sortArray(header.name)}
                    >
                      <span>
                        {header.showName}
                        <span className='sortButton'>
                          {this.state.sortDirection === 'asc'
                            ? <ArrowDropDownIcon />
                            : <ArrowDropUpIcon />}
                        </span>
                      </span>
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
          </div>
        </div>
      ) : null
    )
  }

  handleTablePast = () => {
    this.setState({
      showPast: !this.state.showPas
    })
  }

  handleTableFuture = () => {
    this.setState({
      showFuture: !this.state.showFuture
    })
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
      <>
        <div className='col-xs-12'>
          <div className='row'>
            <div className='headerButtons'>
              <button
                className='buttonz'
                onClick={() => {
                  this.setState({
                    showPast: !this.state.showPast
                  })
                }}
              >
                Spielplan vergangener Spiele
              </button>
              <button
                className='buttonz'
                onClick={() => {
                  this.setState({
                    showFuture: !this.state.showFuture
                  })
                }}
              >
                Spielplan künftiger Spiele
              </button>
            </div>
          </div>
        </div>
        <div className='col-xs-12'>
          <div className='row'>
            {this.showHideTablePast()}
            {this.showHideTableFuture()}
          </div>
        </div>
      </>
    )
  }
}
