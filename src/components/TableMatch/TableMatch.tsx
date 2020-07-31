import React, { Component } from 'react'
import { ITableMatchProps } from './ITableMatch'
import './tablematch.scss'
// import Discovery from '@soccerwatch/discovery'
import _ from 'lodash'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Spinner } from '../Spinner/Spinner'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { Link } from 'react-router-dom'
import InputIcon from '@material-ui/icons/Input'

export let date:any

export class TableMatch extends Component<ITableMatchProps, any> {
  constructor (props: ITableMatchProps) {
    super(props)
    this.state = {
      loading: true,
      pastArray: [],
      futuArray: [],
      showPast: false,
      showFuture: false,
      sortDirection: 'asc',
      linkToPage: '/aisw-cms-MatchPage/' + this.getClubIdFromUrl() + '/',
      configTableHeader: [
        { name: 'clubATeam', showName: 'Heim' },
        { name: 'clubBTeam', showName: 'Gast' },
        { name: 'gameDay', showName: 'Datum' }
      ],
      rows: []
    }
  }

  getClubIdFromUrl () {
    const url = window.location.href
    const parts = url.split('/')
    for (let i = 0; i < parts.length; i++) {
      return parts[4].length > 0 ? parts[4] : null
    }
  }

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    const url:any = await axios.post('https://api-container-dot-sw-sc-de-prod.appspot.com/rest/v1/de/containerCollection/club/' + this.getClubIdFromUrl())
    // const pastArray:any = []
    // const futuArray:any = []
    url.data.container.map((item:any) => {
      const arrayData = {
        clubATeam: item?.tiles[0]?.Match?.clubAName,
        clubBTeam: item?.tiles[0]?.Match?.clubBName,
        gameDay: new Date(item?.tiles[0]?.Match?.startTime).toLocaleString(),
        matchId: item?.tiles[0]?.Match?.matchId,
        object: item?.tiles[0]?.Match
      }
      date = arrayData.gameDay
      if (item?.type !== 'Highlight') {
        if (new Date().getTime() > item?.tiles[0]?.Match?.startTime) {
          if (this.state.pastArray.length < 10) {
            this.state.pastArray.push(arrayData)
          }
        } else {
          if (this.state.futuArray.length < 10) {
            this.state.futuArray.push(arrayData)
          }
        }
      }
    })
    this.setState({
      matchDataOne: url.data,
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
  }

  showHideTable = (show:any, rows:any) => {
    const { linkToPage, configTableHeader, sortDirection } = this.state
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
                    <InputIcon />
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
    const { sortDirection, pastArray, futuArray } = this.state
    const flipSort = sortDirection === 'asc' ? 'desc' : 'asc'
    const sortedRowsPast = _.orderBy(pastArray, [headerString], [flipSort])
    const sortedRowsFutu = _.orderBy(futuArray, [headerString], [flipSort])
    this.setState({
      sortDirection: flipSort,
      pastArray: sortedRowsPast,
      futuArray: sortedRowsFutu
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
                    {this.showHideTable(this.state.showPast, this.state.pastArray)}
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
                    {this.showHideTable(this.state.showFuture, this.state.futuArray)}
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
