import React, { Component } from 'react'
import './squadpage.scss'
import { Input } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import ImageUploader from 'react-images-upload'
import RemoveIcon from '@material-ui/icons/Remove'
import { ISquadPage } from './ISquadPage'
import { teamName } from '../ClubPage/ClubPage'
import { TextBox } from '../Textbox/Textbox'
import axiosRetry from 'axios-retry'
import axios from 'axios'
import Discovery from '@soccerwatch/discovery'

class SquadPage extends Component<ISquadPage, any> {
  constructor (props: ISquadPage) {
    super(props)
    this.state = {
      value: '',
      openID: undefined,
      show: false,
      loading: true,
      pictures: [],
      teamArray: [
        { name: 'Blimmer', alter: '18', trikotnummer: '10', position: 'Mittelfeld' },
        { name: 'Bjurnus Burgus', alter: '84', trikotnummer: '69', position: 'Pfosten' }
      ]
    }
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload (picture:any) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    })
  }

  addRow = () => {
    const arr = this.state.teamArray
    arr.push('new row')
    this.setState({
      arr: arr
    })
  }

  // TO DO: Delete Abbruch wenn vorhandener Eintrag
  delRow = () => {
    const arr = this.state.teamArray
    arr.pop('new row')
    this.setState({
      teamArray: arr
    })
  }

  handleChange = (event:any, value:string, index:any) => {
    var newArray = this.state.teamArray
    newArray[index] = { ...newArray[index], [value]: event.target.value }
    this.setState({
      teamArray: newArray
    })
  }

  handleClose = () => {
    this.setState({
      openID: undefined,
      teamArray: this.state.tempArray
    })
  }

  handleEdit = (index:number) => {
    var initArray = Object.assign([], this.state.teamArray)
    this.setState({
      openID: index,
      tempArray: initArray
    })
  }

  handlePostKader = () => {
  // TODO: PostCall (Sobald API da ist)
    this.setState({
      openID: undefined
    })
  }

  showHideTeam = () => {
    this.setState({
      show: !this.state.show
    })
  }

  // componentDidUpdate (prevProps:any) {
  //   if (this.state.teamArray !== prevProps.teamArray) {
  //     this.setState({
  //       teamArray: prevProps.teamArray
  //     })
  //   }
  // }

  getClubIdFromUrl () {
    const url = window.location.href
    const parts = url.split('/')
    for (let i = 0; i < parts.length; i++) {
      return parts[4].length > 0 ? parts[4] : null
    }
  }

  getData = async () => {
    axiosRetry(axios, { retries: 5 })
    const clubAPI = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
    const res = await Promise.all([
      axios.get(clubAPI)
    ])
    const dataClub = res[0].data
    this.setState({
      dataClub,
      loading: false
    })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      // TO DO: Picture Upload
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='teamTable'>
              <div>
                <h1 className='inputLabel'>
                  {teamName}
                </h1>
              </div>
              <div className='upload-tr'>
                <div className='upload'>
                  <ImageUploader
                    buttonText='Bild hochladen'
                    onChange={this.handleUpload}
                    imgExtension={['.jpg', '.gif', '.png']}
                    maxFileSize={5242880}
                  />
                </div>
                <img
                  className='teamPic'
                  alt=''
                  src='https://cdn.fupa.net/team-image/jpeg/1200x675/xwPrpdZXG7hrf8rGFCy4zRR5kAdy5bGdeu0iVZ0I'
                />
              </div>
              <div className='spacer-small' />
              <div className='clubDescriptionText'>Informationen zum Kader (location als Filler)</div>
              <div className='col-xs-12'>
                <TextBox editableText={
                  this.state.dataClub
                    ? this.state.dataClub?.location
                    : ''
                }
                />
              </div>
              <div className='spacer-small' />
              <table>
                <tbody>
                  <tr>
                    <th className='icon-th'>
                      <AddIcon className='teamtableButtons add' onClick={() => { this.addRow() }} />
                    </th>
                    <th>Spielername</th>
                    <th>Alter</th>
                    <th>Nummer</th>
                    <th>Position</th>
                  </tr>
                  {this.state.teamArray.map((event:any, index:any) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div>
                            {this.state.openID === index
                              ? <CloseIcon className='teamtableButtons cancel' onClick={() => this.handleClose()} />
                              : <EditIcon className='teamtableButtons edit' onClick={() => this.handleEdit(index)} />}
                          </div>
                          {this.state.openID === index ? (
                            <DoneIcon className='teamtableButtons save' onClick={() => this.handlePostKader()} />
                          )
                            : (
                              <div className='icon-th'>
                                <RemoveIcon className='teamtableButtons del' onClick={() => this.delRow()} />
                              </div>
                            )}
                        </td>
                        <td>
                          <Input
                            value={this.state.value || event.name}
                            disabled={this.state.openID !== index}
                            placeholder='Spielername'
                            onChange={(event) => this.handleChange(event, 'name', index)}
                          />
                        </td>
                        <td>
                          <Input
                            value={this.state.value || event.alter}
                            disabled={this.state.openID !== index}
                            placeholder='Alter'
                            onChange={(event) => this.handleChange(event, 'alter', index)}
                          />
                        </td>
                        <td>
                          <Input
                            value={this.state.value || event.trikotnummer}
                            disabled={this.state.openID !== index}
                            placeholder='Trikotnummer'
                            onChange={(event) => this.handleChange(event, 'trikotnummer', index)}
                          />
                        </td>
                        <td>
                          <Input
                            value={this.state.value || event.position}
                            disabled={this.state.openID !== index}
                            placeholder='Position'
                            onChange={(event) => this.handleChange(event, 'position', index)}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SquadPage
