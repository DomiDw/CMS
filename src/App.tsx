import React from 'react'
import './App.scss'
import { Video } from './components/Video/Video'
import { Team } from './components/Team/Team';

function App() {
  return (
    <div className="App"> 
      <Video url={"https://www.youtube.com/watch?v=WydJXOYrmkg"}/>
      <div className="container">
        <Team type={"home"} src={"https://upload.wikimedia.org/wikipedia/de/thumb/d/dd/TSV_Meerbusch_%282015%29.jpg/456px-TSV_Meerbusch_%282015%29.jpg"} />
        <Team type={"guest"} src={"https://vignette.wikia.nocookie.net/wir-sind-schalker/images/2/21/Schalke_04_%281%29.png/revision/latest/scale-to-width-down/340?cb=20120927071957&path-prefix=de"}/>
      </div>
    
    </div>
  );
}

export default App;
