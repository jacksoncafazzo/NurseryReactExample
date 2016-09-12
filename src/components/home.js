import React, { Component } from 'react';


export default class Home extends Component {

  render() {
    const styles = {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    };
    return (
      <div>
        <p><span style={styles}>Peoria Gardens, Inc.</span> is a bedding plant nursery producing annuals, perennials, vegetable starts, herbs and hanging baskets for the wholesale trade.</p>
        <p>Our greenhouses, located in the fertile Willamette Valley, grow high quality young plants for today's sophisticated gardens.</p>
        <p>Our lists also include grasses, ground covers, fall chrysanthemums, ornamental kale and poinsettias.</p>
        <p>We deliver in Western Oregon and Southwest Washington. Our customers, including the finest retail nurseries in the region, receive the highest quality plant materials along with excellent service.</p>
      </div>
    );
  }
}
