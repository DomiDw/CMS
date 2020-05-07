import React from 'react'
import './App.scss'
import '../node_modules/flexboxgrid/css/flexboxgrid.min.css'
import { Video } from './components/Video/Video'
import { Team } from './components/Team/Team';

const logo = 'https://www.tsv-meerbusch.de/wp-content/uploads/TSV_Wappen.png'

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="col-xs-12 center-content">
          <div className="row">
            <div className="col-xs-12">
              <Video url={"https://www.youtube.com/watch?v=WydJXOYrmkg"} />
            </div>
          </div>
          <div className="row">
            <Team
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              home={{ name: 'TSV Meerbusch', logo: logo }}
              score={{ home: "0", guest: "0" }}
              guest={{ name: 'TSV Meerbusch', logo: logo }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;