import React, { Component } from 'react'
import { ITableMatchProps } from './ITableMatch'
import './tablematch.scss'
import _ from 'lodash'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Spinner } from '../Spinner/Spinner'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { Link } from 'react-router-dom'
import InputIcon from '@material-ui/icons/Input'

export class TableMatch extends Component<ITableMatchProps, any> {
  classDate:any
  constructor (props: ITableMatchProps) {
    super(props)
    this.state = {
      loading: true,
      pastArray: [],
      futuArray: [],
      showPast: false,
      showFuture: false,
      sortDirection: 'asc',
      linkToPage: '/cms-MatchPage/' + this.getClubIdFromUrl() + '/',
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

  getSquadFromUrl () {
    const url = window.location.href
    const parts = url.split('/')
    for (let i = 0; i < parts.length; i++) {
      return parts[5].length > 0 ? parts[5] : ''
    }
  }

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    const url:any = await axios.post(
      '*****************************************************************' +
      this.getClubIdFromUrl())
    url.data.container.map((item:any) => {
      for (let i = 0; i < item?.tiles.length; i++) {
        const arrayData = {
          clubATeam: item?.tiles[i]?.Match?.clubAName,
          clubBTeam: item?.tiles[i]?.Match?.clubBName,
          gameDay: new Date(item?.tiles[i]?.Match?.startTime).toLocaleString(),
          matchId: item?.tiles[i]?.Match?.matchId,
          object: item?.tiles[i]?.Match
        }
        if (item?.information.includes(this.getSquadFromUrl())) {
          if (item?.tiles[i]?.state === 'created') {
            this.state.futuArray.push(arrayData)
          } else if (item?.tiles[i]?.state === 'done') {
            if (this.state.pastArray.length < 10) {
              this.state.pastArray.push(arrayData)
            }
          }
        }
      }
      return null
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
