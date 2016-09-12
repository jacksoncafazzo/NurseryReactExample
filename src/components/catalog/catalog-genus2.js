import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

export default class CatalogGenus2 extends Component {
  componentWillMount() {

  }

  renderGenus(genus2) {
    console.log('genus2', genus2)    // let { orderThisByKey } = this.props;
    // let genus2Array = [];
    // let genus2Sections = {};
    // if (null !== genus) {
    //   genus2Sections = orderThisByKey(genus, 'Genus 2');
    //   Object.keys(genus2Sections).map((key, i) => {
    //     genus2Array.push(<CatalogGenus2 genus2={genus2Sections[key]} title={key} key={i} orderThisByKey={orderThisByKey} />);
    //     if (genus2Sections[key].length > 1) {
    //       console.log('longer than one', genus2Sections[key]);
    //     }
    //   });
    // }
    // console.log('genus', genus2Sections);
  }

  render() {
    let { genus2, title } = this.props;
    if (genus2 === null) {
      return (<div>Loading...</div>)
    } else {
      return (
        <Card>
          <CardTitle title={title} />
        {this.renderGenus(genus2)}
        </Card>
      );
    }
  }
}
