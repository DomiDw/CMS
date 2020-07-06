import React, { Component } from 'react'
import './spinner.scss'

export class Spinner extends Component {
  render () {
    return (
      <div className='col-xs-12 spinner'>
        <div className='lds-grid'>
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
        <div className='text'>Informationen werden geladen...</div>
      </div>
    )
  }
}
