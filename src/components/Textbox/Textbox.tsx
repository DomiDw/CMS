import React, { Component } from 'react'
import { ITextboxProps } from './ITextbox'
import './textbox.scss'

export class TextBox extends Component<ITextboxProps, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: this.props.editableText || 'Hier sollte Text stehen',
      isInEditMode: false
    }
  }

    handleEditMode = () => {
      this.setState({
        isInEditMode: !this.state.isInEditMode
      })
    }

    handleComponentValue = () => {
      this.setState({
        isInEditMode: false
      })
    }

    handleChange = (event: any, value: string) => {
      this.setState({
        [value]: event.target.value
      })
    }

    render () {
      return (
        this.state.isInEditMode
          ? (
            <div className='textbox-block col-xs-12'>
              <input
                className='textbox'
                type='text'
                value={this.state.value}
                onChange={(event) => this.handleChange(event, 'value')}
              />
              <button onClick={this.handleComponentValue}>Speichern</button>
              <button onClick={this.handleEditMode}>Abbruch</button>
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
