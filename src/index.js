import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import borderData from './border';
import LeafletPip from '@mapbox/leaflet-pip';

//-------------React Components----------------------//
import Map from './map';
import Modal from './modal'
import InfoBox from './info-box';

//-------------Main React parent Component-------------//
class App extends React.Component {
  state = { //set up initial game state
    // You might also want to track score in here...
    gameStarted: false,

    modalDisplayed: false,

    vtBorder: L.geoJSON(borderData),//translates the borderData file into a usable leaflet object

    centerView: {//the location of the current map center
      lat: 44,
      lng: -72.317
    },

    initialPoint: {//the location of the initial random point
      lat: 44,
      lng: -72.317
    }
  }

  getRandoLat() {//Random Lat using max and min lats for VT
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315;
    return lat;
  }

  getRandoLng() {//Random Lng using max and min lngs for VT
    let lng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
    return lng;
  }

  startGame = () => {//set initial game start
    let randomLat = this.getRandoLat();
    let randomLng = this.getRandoLng();
    // Leaflet pip returns an array of the layers a given point is in
    // it is used like so: LeafletPip.pointInLayer(coords, layer)
    let layerArray = LeafletPip.pointInLayer([randomLng, randomLat], L.geoJSON(borderData));

    while (layerArray.length === 0) {
      //if the point isn't inside any layers (i.e. it's outside of VT)
      randomLat = this.getRandoLat();
      randomLng = this.getRandoLng(); //choose new points
      //and check if they're inside VT again
      layerArray = LeafletPip.pointInLayer([randomLng, randomLat], L.geoJSON(borderData))

    };

    //Once you've got a valid point ACTUALLY start the game
    this.setState(
      {
        gameStarted: true,
        centerView: {
          lat: randomLat,
          lng: randomLng
        },
        initialPoint: {
          lat: randomLat,
          lng: randomLng
        }
      }
    );
  }

  giveUp = () => {//on quit button click
    this.setState({ gameStarted: false })
  }

  guess = () => {//on guess button click
    this.setState({
      modalDisplayed: true //open the "guess" form 
    })
  }


  //move functions change the value of the center point, but don't actually move the map
  //Moving the map is the responsibility of the 'Map' component
  moveNorth = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat + .002,
          lng: this.state.centerView.lng
        }
      })
  }

  moveSouth = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat - .002,
          lng: this.state.centerView.lng
        }
      })
  }

  moveEast = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat,
          lng: this.state.centerView.lng + .0025
        }
      })
  }

  moveWest = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat,
          lng: this.state.centerView.lng - .0025
        }
      })
  }

  //handle guess form post
  async handleSubmit(event){
    event.preventDefault();
  }

  render() {
    // grab all the values out of state I need, and set them to variables
    let { centerView, vtBorder, gameStarted, initialPoint, modalDisplayed } = this.state

    return (
      <div>
        {/*Pass necessary props to components that need them*/}
        <Modal modalDisplayed = {modalDisplayed}/>
        <div id="game-buttons">
          <button id="start" onClick={this.startGame} disabled={this.state.gameStarted}>Start</button>
          <button id="quit" onClick={this.giveUp} disabled={!this.state.gameStarted}>Give Up</button>
          <button id="guess" onClick={this.guess} disabled={!this.state.gameStarted}>Guess</button>
        </div>
        <div id="game-area">
          {/*Since I'm having the buttons manipulate this state they need to live here*/}
          <button id="north" className="move-button" onClick={this.moveNorth} >Go North</button>
          <button id="south" className="move-button" onClick={this.moveSouth} >Go South</button>
          <button id="east" className="move-button" onClick={this.moveEast} >Go East</button>
          <button id="west" className="move-button" onClick={this.moveWest} >Go West</button>
          {/*Pass necessary props to components that need them*/}
          <Map centerView={centerView} vtBorder={vtBorder} gameStarted={gameStarted} initialPoint={initialPoint} />
        </div>
        <InfoBox />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)