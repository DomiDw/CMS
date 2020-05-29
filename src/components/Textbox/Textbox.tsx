import React, { Component } from 'react'
import { ITextboxProps, ITextBoxState } from './ITextbox'
import './textbox.scss'

export class TextBox extends Component<ITextboxProps, ITextBoxState> {
  initValue:string

  constructor (props: ITextboxProps) {
    super(props)
    this.state = {
      value: this.props.editableText || 'Hier sollte Text stehen',
      isInEditMode: false
    }
    this.initValue = this.state.value
  }

    handleEditModeToDefault = () => {
      this.setState({
        value: this.initValue,
        isInEditMode: !this.state.isInEditMode
      })
    }

    handleEditMode = () => {
      this.setState({
        value: this.state.value,
        isInEditMode: !this.state.isInEditMode
      })
    }

    showTooltip = () => {
      return (
        <div className='tooltip'>
          <span className='tooltiptext'>
            asd
          </span>
        </div>
      )
    }

    handleComponentValue = () => {
      if (this.state.value.length === 0 || this.state.value === 'Bitte einen Eintrag vornehmen') {
        // this.showTooltip()
        this.setState({
          isInEditMode: true,
          value: ''
        })
      } else {
        this.setState({
          isInEditMode: false,
          value: this.state.value
        })
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
              {this.state.value.length === 0 ? (
                <div className='tooltip' title='Bitte hier Text einfügen'>
                  <span className='tooltiptext'>
                    {this.state.value}
                  </span>
                </div>
              )
                : null}
              <button className='tooltip' title='asdf' onClick={this.handleComponentValue}>
                <span className='tooltiptext'>
                  Speichern
                </span>
              </button>
              <button onClick={this.handleEditModeToDefault}>
                Abbruch
              </button>
            </div>
          )
          : (
            <div onClick={this.handleEditMode}>
              {this.state.value}
            </div>
          )
      )
    }
}
