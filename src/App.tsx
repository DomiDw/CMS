import React from 'react'
import './App.scss'
import '../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Video } from './components/Video/Video'
import { Team } from './components/Team/Team'
import { DescriptionBox } from './components/Textbox/Textbox'
import { ClubMessageBox } from './components/Textbox/Textbox'

const logoHome = 'https://www.tsv-meerbusch.de/wp-content/uploads/TSV_Wappen.png'
const logoGuest = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/FC_Schalke_04_Logo.svg/2000px-FC_Schalke_04_Logo.svg.png'

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="col-xs-6 center-content">
          <div className="row">
            <div className="col-xs-12">
              <Video
              url={"ttps://www.youtube.com/watch?v=WydJXOYrmkg"}
              />
            </div>
          </div>
          <div className="row">
            <Team
              size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              home={{ name: 'TSV Meerbusch', logo: logoHome }}
              score={{ home: "0", guest: "0" }}
              guest={{ name: 'FC Schalke 04', logo: logoGuest }}
            />
            <div className="col-xs-12">
              <DescriptionBox
                descriptionText={"asdf"}
              />
              <ClubMessageBox
                clubMessage={"asdffff"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;