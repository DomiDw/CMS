import React, { Component } from 'react'
import { ITextboxProps, ITextBoxState } from './ITextbox'
import './textbox.scss'

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
    }
    // standard issue with TS (false positive)
    // eslint-disable-next-line
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
