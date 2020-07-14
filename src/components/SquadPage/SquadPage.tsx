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

class SquadPage extends Component<ISquadPage, any> {
  constructor (props: ISquadPage) {
    super(props)
    this.state = {
      value: '',
      openID: undefined,
      show: false,
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
                <table>
                  <tbody>
                    <tr>
                      <th className='icon-th' colSpan={5}>
                        <AddIcon className='teamtableButtons' onClick={() => { this.addRow() }} />
                      </th>
                    </tr>
                    {this.state.teamArray.map((event:any, index:any) => {
                      return (
                        <tr key={index}>
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
                          <td>
                            <div>
                              {this.state.openID === index
                                ? <CloseIcon className='teamtableButtons cancel' onClick={() => this.handleClose()} />
                                : <EditIcon className='teamtableButtons edit' onClick={() => this.handleEdit(index)} />}
                            </div>
                            {this.state.openID === index ? (
                              <DoneIcon className='teamtableButtons save' onClick={() => this.handlePostKader()} />
                            )
                              : null}
                          </td>
                        </tr>
                      )
                    })}
                    <tr>
                      <th className='icon-th' colSpan={5}>
                        <RemoveIcon className='teamtableButtons' onClick={() => { this.delRow() }} />
                      </th>
                    </tr>
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
