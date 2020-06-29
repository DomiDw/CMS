import React, { Component } from 'react'
import { ITextboxProps, ITextBoxState } from './ITextbox'
import './textbox.scss'
import Discovery from '@soccerwatch/discovery'
import axios from 'axios'

export class TextBox extends Component<ITextboxProps, ITextBoxState> {
  initValue:string
  newValue:string

  constructor (props: ITextboxProps) {
    super(props)
    this.state = {
      value: this.props.editableText || 'Hier sollte Text stehen',
      isInEditMode: false
    }
    this.initValue = this.state.value
    this.newValue = this.props.editableText
  }

    handleEditModeToDefault = () => {
      this.setState({
        value: this.newValue,
        isInEditMode: !this.state.isInEditMode
      })
    }

    handleEditMode = () => {
      this.setState({
        value: this.state.value,
        isInEditMode: !this.state.isInEditMode
      })
    }

    handleComponentValue = () => {
      if (this.state.value.length === 0) {
        this.setState({
          isInEditMode: true,
          value: ''
        })
      } else {
        this.setState({
          isInEditMode: false,
          value: this.state.value
        })
        this.newValue = this.state.value
      }
      this.getAndUpdateLocation()
    }

    getAndUpdateLocation () {
      const locationAPI = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
      // const res = await axios.get(locationAPI)
      // const metaDataLocation = res.data.location
      const data = {
        location: this.newValue
      }
      axios.post(locationAPI, data)
        .then((data) => {
          console.log(data)
        })
        .catch((err:Error) => {
          console.log(err)
        })
    }

    getClubIdFromUrl () {
      const url = (window.location).href
      const parts = url.split('/')
      for (let i = 0; i < parts.length; i++) {
        return parts[4].length > 0 ? parts[4] : null
      }
    }

    // getLocation = async () => {
    //   const locationAPI = Discovery.API_CLUB + '/info/' + this.getClubIdFromUrl()
    //   const res = await axios.get(locationAPI)
    //   const metaDataLocation = res.data.location
    //   return metaDataLocation
    // }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      this.setState({
        value: event.target.value
      })
    }

    render () {
      return (
        this.state.isInEditMode
          ? (
            <div className='textbox-block'>
              <textarea
                className='textbox'
                placeholder='Bitte einen Eintrag vornehmen'
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button className='button save' onClick={this.handleComponentValue}>
                Speichern
              </button>
              <button className='button cancel' onClick={this.handleEditModeToDefault}>
                Abbruch
              </button>
            </div>
          )
          : (
            <div className='textbox-block' onClick={this.handleEditMode}>
              <textarea
                className='textbox'
                placeholder='Bitte einen Eintrag vornehmen'
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button disabled className='button save'>
                Speichern
              </button>
            </div>
          )
      )
    }
}
