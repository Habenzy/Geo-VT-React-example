import React from 'react';
import L from 'leaflet';

class Map extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      centerView: this.props.centerView
    }
  }

  componentDidMount() {
    //set up the initial map object here and bind it to the component
    this.map = L.map('map', {
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })

      ]
    });

    //centered on VT zoomed out enough to show the whole state
    this.map.setView([43.89, -72.7317], 8);

    //Draw a line for VT's border on the map using the border data we passed as a prop from App
    this.props.vtBorder.addTo(this.map).setStyle({fillColor: 'rgba(0,0,0,0)'})
  }

  componentDidUpdate() {
  //disable all map controls
    // --I'm no going to tell you how to disable controls
    // --You should get used to reading documentation, It's all in the leaflet docs
    // If the game is running, and the centerView has changed
    if(this.props.gameStarted && this.props.centerView !== this.state.centerView) {
      //update the centerView
      this.setState({centerView: this.props.centerView})
      //and go to the new centerpoint at max zoom
      this.map.setView(this.props.centerView, 18);
    }
    else if(!this.props.gameStarted) {
      //Once the game ends reenable map controls
      //and recenter the map
      
    }
  }

  render() {
    //The only HTML we need is the map container
    return( <div id="map" ></div> )
  }
}

export default Map
