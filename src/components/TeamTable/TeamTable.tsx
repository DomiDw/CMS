import React, { Component } from 'react'
import './teamtable.scss'
import { Input } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import AddIcon from '@material-ui/icons/Add'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'

export class TeamTable extends Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: '',
      openID: undefined,
      array: [
        { name: 'Blimmer', alter: '18', trikotnummer: '10', position: 'Mittelfeld' },
        { name: 'Bjurnus Burgus', alter: '84', trikotnummer: '69', position: 'Bankwärmer' },
        { name: 'Bjurnus Burgus', alter: '84', trikotnummer: '69', position: 'Bankwärmer' },
        { name: 'Bjurnus Burgus', alter: '84', trikotnummer: '69', position: 'Bankwärmer' }
      ]
    }
  }

    handleChange = (event:any, value:string, index:any) => {
      var newArray = this.state.array
      newArray[index] = { ...newArray[index], [value]: event.target.value }
      this.setState({
        array: newArray
      })
    }

    handleClose = () => {
      this.setState({
        openID: undefined,
        array: this.state.tempArray
      })
    }

    handleEdit = (index:number) => {
      var initArray = Object.assign([], this.state.array)
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

    render () {
      return (
      // TO DO: Picture Upload
        <div className='col-xs-12'>
          <div className='row'>
            <div className='teamTable'>
              <div className='upload-tr'>
                <div className='upload'>
                  <PublishIcon />
                  Foto hochladen
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
                      <AddIcon className='teamtableButtons' />
                    </th>
                  </tr>
                  {this.state.array.map((event:any, index:any) => {
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
}
