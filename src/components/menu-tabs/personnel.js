import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

export default class Personnel extends Component {

  render() {
    return (
      <div>
        <h2>Personnel</h2>
        <List>
          <ListItem primaryText='President and General Manager' secondaryText={<p>
              <span style={{color: darkBlack}}>Ben Verhoeven - </span>
              <a href='mailto:benv@peoriagardens.com'>benv@peoriagardens.com</a>
            </p>}
            secondaryTextLines={2}
            />
          <ListItem primaryText='Vice President and Head Grower' secondaryText={<p>
              <span style={{color: darkBlack}}>Tom Verhoeven - </span>
              <a href='mailto:tomv@peoriagardens.com'>tomv@peoriagardens.com</a>
            </p>}
            secondaryTextLines={1} />

          <ListItem primaryText='Sales Manager and Perennial Production Manager' secondaryText={<p>
              <span style={{color: darkBlack}}>Tom Cammarota - </span><a href='mailto:sales@peoriagardens.com'>sales@peoriagardens.com</a>
            </p>}
            secondaryTextLines={1} />
          <ListItem primaryText='Office Manager' secondaryText={<p>
              <span style={{color: darkBlack}}>Sarah Noble - </span>
              <a href='mailto:accounts@peoriagardens.com'>accounts@peoriagardens.com</a>
            </p>} />
          <ListItem primaryText='Propagation Supervisor' secondaryText={<p>
              <span style={{color: darkBlack}}>Lauren Brown - </span>
              <a href='mailto:lauren@peoriagardens.com'>lauren@peoriagardens.com</a>
            </p>} />
            <ListItem primaryText='Assistant Grower' secondaryText={<p>
                <span style={{color: darkBlack}}>Melissa Giancola - </span>
                <a href='mailto:melissa@peoriagardens.com'>melissa@peoriagardens.com</a>
              </p>} />
              <ListItem primaryText='Assistant Grower' secondaryText={<p>
                  <span style={{color: darkBlack}}>Nico Ardans - </span>
                  <a href='mailto:nico@peoriagardens.com'>nico@peoriagardens.com</a>
                </p>} />

        </List>




      </div>
    );
  }
}
// <div class='row'>
//   Peoria Gardens, Inc.
//   32355 Peoria Road
//   Albany, OR 97321
//
// </div>
