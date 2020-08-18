import React, { Component } from 'react'
import './navbar.scss'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

export class Navbar extends Component {
  getClubIdFromUrl () {
    const url = window.location.href
    const parts = url.split('/')
    for (let i = 0; i < parts.length; i++) {
      return parts[4].length > 0 ? parts[4] : null
    }
  }

  backToPage: string =
  'http://localhost:3000/cms-clubpage/' +
  this.getClubIdFromUrl();

  render () {
    return (
      <div className='navbar'>
        <IconButton>
          <a className='navButton' href={this.backToPage}>
            <ArrowBackIcon color='primary' />
          </a>
        </IconButton>
      </div>
    )
  }
}
