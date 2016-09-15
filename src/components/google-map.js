import React, { Component } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import { default as update } from 'react-addons-update';
import { default as FaSpinner } from 'react-icons/lib/fa/spinner';
import { default as ScriptjsLoader } from 'react-google-maps/lib/async/ScriptjsLoader';

export default class AsyncGettingStarted extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [{
        position: {
          lat: 44.520318,
          lng: -123.207657,
        },
        key: 'Peoria Gardens',
        defaultAnimation: 2,
      }],
      version: 3.24
    };
  }

  handleMapClick(event) {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });

    if (markers.length === 3) {
      this.props.toast(
        'Right click on the marker to remove it',
        'Also check the code!'
      );
    }
  }

  handleMarkerRightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  render() {
    return (
      <ScriptjsLoader
      hostname={'maps.googleapis.com'}
      pathname={'/maps/api/js'}
      query={{ v: this.state.version, libraries: 'geometry,drawing,places' }}
      loadingElement={
        <div {...this.props} style={{ height: '100%' }}>
        <FaSpinner
        style={{
          display: 'block',
          width: 200,
          height: 200,
          margin: '100px auto',
          animation: 'fa-spin 2s infinite linear',
        }}/>
        </div>
      }
      containerElement={
        <div style={{ height: '100%' }}/>
      }
      googleMapElement={
        <GoogleMap
          ref={googleMap => {
            if (!googleMap) {
              return;
            }
            console.log(googleMap);
            console.log(`Zoom: ${ googleMap.getZoom() }`);
            console.log(`Center: ${ googleMap.getCenter() }`);
          }}
          defaultZoom={12} defaultCenter={{ lat: 44.520318, lng: -123.207657 }}
          onClick={this.handleMapClick.bind(this)}
        >
          {this.state.markers.map((marker, index) => {
            return (
              <Marker
                {...marker}
                onRightClick={this.handleMarkerRightclick.bind(this, index)}
              />
            );
          })}
        </GoogleMap>
      }
      />
    );
  }
};
