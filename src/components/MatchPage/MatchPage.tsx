import React, { Component } from 'react'
import './MatchPage.scss'
import '../../../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Video } from '../Video/Video'
import { Team } from '../Team/Team'
import { TextBox } from '../Textbox/Textbox'
import { IMatchPageState, IMatchPageProps } from './IMatchPage'
import axios from 'axios'

const logoHome = 'https://www.tsv-meerbusch.de/wp-content/uploads/TSV_Wappen.png'
const logoGuest = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/FC_Schalke_04_Logo.svg/2000px-FC_Schalke_04_Logo.svg.png'
const descriptionText = 'Vereinsbeschreibung'
const clubMessage = 'Vereinsnachricht'
const videoApi = 'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-video/meta/10000'
const clubApi = 'https://europe-west1-sw-sc-de-prod.cloudfunctions.net/api-club/docs/#/club/getClub1'

class MatchPage extends Component<IMatchPageProps, IMatchPageState> {
  constructor(props:IMatchPageProps) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    axios.get(videoApi)
      .then(res => {
        const metaDataVideo = res.data
        this.setState({ metaDataVideo })
      })
    axios.get(clubApi)
      .then(res => {
        const metaDataClub = res.data
        this.setState({ metaDataClub })
      })
  }
  render() {
    return (
      <div className='MatchPage'>
        <a href='https://www.google.de/' target='blank'>
          <button className='backButton'>
            Zurück
          </button>
        </a>
        <div className='container-fluid'>
          <div className='col-xs-6 center-content'>
            <div className='row'>
              <div className='col-xs-12'>
                <Video
                  url={this.state.metaDataVideo ? this.state.metaDataVideo.userStream :  ''}
                />
              </div>
            </div>
            <div className='row'>
              <Team
                size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                home={{ name: 'TSV Meerbusch', logo: logoHome }}
                score={{ home: '0', guest: '0' }}
                guest={{ name: 'FC Schalke 04', logo: logoGuest }}
              />
              <div className='clubDescriptionText'>
                Vereinsbeschreibung
              </div>
              <div className='col-xs-12'>
                <TextBox
                  editableText={descriptionText}
                />
                <div className='clubMessageText'>
                  Vereinsnachricht
                </div>
                <TextBox
                  editableText={clubMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MatchPage
