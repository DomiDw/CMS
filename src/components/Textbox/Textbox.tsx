import React, { Component } from 'react'
import { ITextboxProps, ITextBoxState } from './ITextbox'
import './textbox.scss'
import Discovery from '@soccerwatch/discovery'
import axios from 'axios'

export class TextBox extends Component<ITextboxProps, ITextBoxState> {
  initValue: string;
  newValue: string;

  constructor (props: ITextboxProps) {
    super(props)
    this.state = {
      value: this.props.editableText,
      isInEditMode: false
    }
    this.initValue = this.state.value
    this.newValue = this.props.editableText
  }

  componentDidUpdate (prevProps: any) {
    if (prevProps.editableText !== this.props.editableText) {
      this.setState({
        value: this.props.editableText
      })
    }
  }

  handleEditModeToDefault = () => {
    this.setState({
      value: this.props.editableText,
      isInEditMode: !this.state.isInEditMode
    })
  }

  handleEditMode = () => {
    this.setState({
      value: this.state.value,
      isInEditMode: !this.state.isInEditMode
    })
  }

  getClubIdFromUrl () {
    const url = window.location.href
    const parts = url.split('/')
    for (let i = 0; i < parts.length; i++) {
      return parts[4].length > 0 ? parts[4] : null
    }
  }

  postClub = async () => {
    const url = (await Discovery.API_CLUB) + '/info'
    const username = 'dominik.dwinger@soccerwatch.tv'
    const password = 'f9e9ee4cd6389956c8cc3cdc7bebcc8a'
    const credentials = window.btoa(username + ':' + password)
    const basicAuth = 'Basic ' + credentials
    const data = JSON.stringify({
      RowKey: this.getClubIdFromUrl(),
      location: this.state.value
    })
    axios
      .post(url, data, {
        headers: {
          authorization: basicAuth,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err: Error) => {
        console.log(err)
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
      this.postClub()
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      value: event.target.value
    })
  }

  render () {
    return (
      <div className='row'>
        {this.state.isInEditMode ? (
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
            <button
              className='button cancel'
              onClick={this.handleEditModeToDefault}
            >
              Abbruch
            </button>
          </div>
        ) : (
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
        )}
      </div>
    )
  }
}
