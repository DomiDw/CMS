import React, { Component } from 'react'

class Registration extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <>
        <div className='spacer-small' />
        <a href='https://soccerwatch.tv/profile' target='blank'>
          <button type='button' className='btn btn-info'>
            Registrierung auf Soccerwatch.tv
          </button>
        </a>
      </>
    )
  }
}

export default Registration
