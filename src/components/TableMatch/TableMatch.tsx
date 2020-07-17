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
import { Link } from 'react-router-dom'
import LaunchIcon from '@material-ui/icons/Launch'

export class TableMatch extends Component<ITableMatchProps, any> {
  constructor (props: ITableMatchProps) {
    super(props)
    this.state = {
      loading: true,
      showPast: false,
      showFuture: false,
      sortDirection: 'asc',
      linkToPage: '/aisw-cms-MatchPage/1/',
      configTableHeader: [
        { name: 'clubATeam', showName: 'Heim Mannschaft' },
        { name: 'clubBTeam', showName: 'Gast Mannschaft' },
        { name: 'gameDay', showName: 'Datum' },
        { name: 'matchId', showName: 'Zum Spiel' }
      ],
      rows: []
    }
  }

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    const firstMatchAPI = Discovery.API_VIDEO + '/meta/41651'
    const secondMatchAPI = Discovery.API_VIDEO + '/meta/41196'
    const thirdMatchAPI = Discovery.API_VIDEO + '/meta/37400'
    const res = await Promise.all([
      axios.get(firstMatchAPI),
      axios.get(secondMatchAPI),
      axios.get(thirdMatchAPI)
    ])
    const firstMatchData = res[0].data
    const secondMatchData = res[1].data
    const thirdMatchData = res[2].data
    this.setState({
      matchDataOne: firstMatchData,
      matchDataTwo: secondMatchData,
      matchDataThree: thirdMatchData,
      rows: [
        {
          clubATeam: firstMatchData.clubATeam,
          clubBTeam: firstMatchData.clubBTeam,
          gameDay: firstMatchData.gameDay,
          matchId: firstMatchData.matchId,
          object: firstMatchData
        },
        {
          clubATeam: secondMatchData.clubATeam,
          clubBTeam: secondMatchData.clubBTeam,
          gameDay: secondMatchData.gameDay,
          matchId: secondMatchData.matchId,
          object: secondMatchData
        },
        {
          clubATeam: thirdMatchData.clubATeam,
          clubBTeam: thirdMatchData.clubBTeam,
          gameDay: thirdMatchData.gameDay,
          matchId: thirdMatchData.matchId,
          object: thirdMatchData
        }
      ],
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
  }

  // showHideTablePast = () => {
  //   const { linkToPage, showPast, configTableHeader, sortDirection, rows } = this.state
  //   return (
  //     showPast === true ? (
  //       <table>
  //         <thead>
  //           <tr>
  //             {configTableHeader.map((header:any, i:number) => (
  //               <th
  //                 key={i}
  //                 className='sortHeader'
  //                 onClick={() => this.sortArray(header.name)}
  //               >
  //                 <span>
  //                   {header.showName}
  //                   <span className='sortButton'>
  //                     {sortDirection === 'asc'
  //                       ? <ArrowDropDownIcon />
  //                       : <ArrowDropUpIcon />}
  //                   </span>
  //                 </span>
  //               </th>
  //             ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {rows.map((row: any, i:number) => (
  //             <tr key={i}>
  //               <td>{row.clubATeam}</td>
  //               <td>{row.clubBTeam}</td>
  //               <td>{row.gameDay}</td>
  //               <td>
  //                 <Link
  //                   to={{
  //                     pathname: linkToPage + row.matchId,
  //                     query: { matchData: row.object }
  //                   }}
  //                 >
  //                   <LaunchIcon />
  //                 </Link>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     ) : null
  //   )
  // }

  showHideTable = (show:any) => {
    const { linkToPage, configTableHeader, sortDirection, rows } = this.state
    return (
      show === true ? (
        <table>
          <thead>
            <tr>
              {configTableHeader.map((header:any, i:number) => (
                <th
                  key={i}
                  className='sortHeader'
                  onClick={() => this.sortArray(header.name)}
                >
                  <span>
                    {header.showName}
                    <span className='sortButton'>
                      {sortDirection === 'asc'
                        ? <ArrowDropDownIcon />
                        : <ArrowDropUpIcon />}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i:number) => (
              <tr key={i}>
                <td>{row.clubATeam}</td>
                <td>{row.clubBTeam}</td>
                <td>{row.gameDay}</td>
                <td>
                  <Link
                    to={{
                      pathname: linkToPage + row.matchId,
                      query: { matchData: row.object }
                    }}
                  >
                    <LaunchIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null
    )
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
            <div className='col-xs-12 col-sm-12 col-md-6 col-center'>
              <div className='row'>
                <div>
                  <div className='col-xs-12 left-Side'>
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
                  </div>
                  <div className='spacer-small' />
                  <div className='col-xs-12'>
                    {this.showHideTable(this.state.showPast)}
                  </div>
                  <div className='spacer-small' />
                </div>
              </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-6 col-center'>
              <div className='row'>
                <div>
                  <div className='col-xs-12 right-Side'>
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
                  <div className='spacer-small' />
                  <div className='col-xs-12'>
                    {this.showHideTable(this.state.showFuture)}
                  </div>
                  <div className='spacer-small' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
