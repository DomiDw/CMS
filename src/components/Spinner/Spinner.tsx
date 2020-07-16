import React, { Component } from 'react'
import './spinner.scss'
import { ISpinnerProps } from './ISpinner'

export class Spinner extends Component<ISpinnerProps> {
  constructor (props: ISpinnerProps) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='col-xs-12 spinner'>
        <div className='lds-spinner'>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className='text'>{this.props.text ? this.props.text : 'Informationen werden geladen...'}</div>
      </div>
    )
  }
}
