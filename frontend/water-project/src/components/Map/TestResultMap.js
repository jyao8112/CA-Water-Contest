import React from 'react'
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { BadIcon } from './BadIcon';
import { GoodIcon } from './GoodIcon';
import Control from 'react-leaflet-control';

import './map.scss';

export class TestResultMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
            readyToRender: false, 
            displayGood: true,
            displayBad: true
          };
    }

        
    invalidateMap() {
        if (this.refs.map) {
          this.refs.map.leafletElement.invalidateSize();
      }
    }

    clickBad = () => {
        const status = this.state.displayBad;
        this.setState({displayBad: !status});
    }

    clickGood = () => {
        const status = this.state.displayGood;
        this.setState({displayGood: !status});
    }

    render() {
        const {userLat, userLon} = this.props;
        const position = [userLat, userLon];

        const { displayBad, displayGood } = this.state;

        const {goodMarkers, badMarkers} = this.props;
        const goodResCount = goodMarkers.length;
        const badResCount = badMarkers.length;

        return (
          <Map center={position} zoom={this.state.zoom} ref="map" onDragEnd={this.invalidateMap()}>
            <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {  displayGood && 
                goodMarkers.map((result, idx) => {
                    const pos = [result[1], result[2]];
                    
                    return  (
                        <Marker position={pos} icon={GoodIcon} key={idx}>
                            <Popup>
                                <span>water quality: Satisfied</span>
                            </Popup>
                        </Marker>
                    );
                })                
            }
            {  displayBad && 
                badMarkers.map((result, idx) => {
                    const pos = [result[1], result[2]];
                    
                    return  (
                        <Marker position={pos} icon={BadIcon} key={idx}>
                            <Popup>
                                <span>water quality: Concerned</span>
                            </Popup>
                        </Marker>
                    );
                })                
            }
            <Control>
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '5px',
                    }}
                >
                    <div >
                        <button className="mapButton"  onClick={this.clickGood}>
                        Satisfied
                        </button>
                    </div>
                    <div >
                        <button  className="mapButton"  onClick={this.clickBad}>
                        Concerned 
                        </button>
                    </div>
                </div>
            </Control>
            <Control position="bottomright">
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '3px'
                    }}
                >
                    <div >
                        <span>Satisfied {goodResCount}</span>
                    </div>
                    <div >
                        <span>Concerned {badResCount}</span>
                    </div>
                </div>
            </Control>
          </Map>
        );
      }
}

