import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
// import CatalogGenus2 from './catalog-genus2.js';
import './styles/catalog-index.css';
import Toggle from 'material-ui/Toggle';
import CatalogVariety from './catalog-variety';

export default class CatalogGenus extends Component {
  constructor(props) {
    super(props);
    let {genus, title} = this.props;
    let genusKeys = Object.keys(genus);
    let subtitle = `${title} ${genusKeys[0]}`
    this.state = {
      varietyExpanded: true,
      genus: genus,
      title: title,
      subtitle: subtitle,
      description: genus['Description'],
    }
  }

  componentWillMount() {
    let { section, title } = this.props;
    // let ref = firebase.database().ref(`catalog/${section}`)
    //   .orderByChild('Genus')
    //   .startAt(title)
    //   .endAt(title)
    // this.setState({ genusRef: ref });
    // ref.on('value', (snapshot) => {
    //   let plants = snapshot.val();
    //   let { varietyKeys, varietyRenderArray } = this.state;
    //   Object.keys(plants).map((key) => {
    //     varietyRenderArray.push(<Card key={`variety${key}`} expandable={true} className='plant-card'>
    //     <CardHeader title={plants[key]['Variety 2']}
    //       subtitle={`${plants[key]['Genus 2']} ${plants[key]['Species 2']}`}
    //       />
    //     <CardText><div dangerouslySetInnerHTML={{__html: plants[key]['Description']}}></div></CardText>
    //     <CardText>Size: {plants[key]['GROWPOINT ITEMDESC']}
    //     </CardText>
    //     <CardText>Volume: {plants[key]['Volume US (Metric)']}
    //     </CardText>
    //     {(undefined !== plants[key]['Color']) ? this.renderColor(plants[key]['Color']) : null}
    //     <CardText>Pot Category: {plants[key]['Pot Category']}
    //     </CardText>
    //     <CardText>Macore ID: {plants[key]['MACORE ID']}
    //     </CardText>
    //     <CardText>Exposure: {plants[key]['Exposure']}
    //     </CardText>
    //     </Card>
    //     );
    //   });
    // });
  }

  handleExpandChange(expanded) {
    this.setState({ varietyExpanded: expanded});
  };

  handleToggle(event, toggle) {
   this.setState({ varietyExpanded: toggle });
  };

  renderColor(colors) {
    let colorsLength = Object.keys(colors).length

    let renderArray = [];
    let firstPart = 'Color'
    if (colorsLength > 1) {
      firstPart += 's';
    }
    Object.keys(colors).map((key, i) => {
      renderArray.push(<CardText key={i}>{`${firstPart}: ${colors[key]}`}</CardText>);
    });

    return renderArray;
  }

  // renderGenus(genus) {
  //   let { title } = this.props;
  //   let genusArray = [];
  //   if (undefined !== genus) {
  //     let variety = '';
  //     let varieties = {};
  //     Object.keys(genus).map((key) => {
  //       if (genus[key]['Variety'] !== variety) {
  //         varieties[genus[key]['Variety']] = [];
  //       }
  //     });
  //     Object.keys(genus).map((key, i) => {
  //       let variety = genus[key]['Variety'];
  //       if (variety) {
  //         varieties[variety].push(genus[key]);
  //       }
  //     });
  //     let currentVariety = '';
  //     let varietyLength = Object.keys(varieties).length;
  //     Object.keys(varieties).map((key, i) => {
  //       console.log('varieties', varieties[key]);
  //
  //       if (varieties[key].length === 1) {
  //         let variety = varieties[key][0];
  //         genusArray.push(
  //           <CardText expandable={true} className='genus-card' key={variety['GP Item Code']}>
  //             <CardTitle title={variety['Variety 2']} subtitle={`${variety['Genus 2']} ${variety['Species 2']}`} />
  //             <CardText><div dangerouslySetInnerHTML={{__html: variety['Description']}}></div></CardText>
  //             <CardText>Size available: <ul><li>{variety['GROWPOINT ITEMDESC']}</li><li>Volume: {variety['Volume US (Metric)']}</li></ul></CardText>
  //             <CardText>Macore ID: {variety['MACORE ID']}</CardText>
  //             {(undefined !== variety['Color']) ? this.renderColor(variety['Color']) : null}
  //             <CardText>Exposure: {variety['Exposure']}</CardText>
  //           </CardText>);
  //         }
  //         if (varieties[key].length > 1) {
  //           let variety = varieties[key][0];
  //           variety['volumes'] = [];
  //           variety['sizes'] = [];
  //           variety['potCategories'] = [];
  //           varieties[key].map((thisVariety, j) => {
  //             // variety['Color'] = thisVariety['Color'];
  //             variety['sizes'].push(thisVariety['GROWPOINT ITEMDESC'])
  //             variety['potCategories'].push(thisVariety['Pot Category']);
  //             variety['volumes'].push(thisVariety['Volume US (Metric)']);
  //             variety['title'] = thisVariety['Variety 2'];
  //             // variety['Height'] = thisVariety['Height'];
  //             // variety['Exposure'] = thisVariety[]
  //             variety['subtitle'] = `${thisVariety['Genus 2']} ${thisVariety['Species 2']}`;
  //             console.log('VOLUMES', variety['volumes']);
  //           });
  //           genusArray.push(
  //             <CardText className='genus-card' key={variety['title']} expandable={true}>
  //               <CardTitle title={variety['title']} subtitle={variety['subtitle']} />
  //               <CardText>Sizes Available:
  //                 {variety['sizes'].map((size, i) => {
  //                   return (<ul><li>{size}</li><li>Volume: {variety['volumes'][i]}</li></ul>)
  //                 })} </CardText>
  //                 <CardText><div dangerouslySetInnerHTML={{__html: variety['Description']}}></div></CardText>
  //                 {(undefined !== variety['Color']) ? this.renderColor(variety['Color']) : null}
  //                 <CardText>Height: {variety['Height']}</CardText>
  //                 <CardText>Exposure: {variety['Exposure']}</CardText>
  //               </CardText>);
  //               console.log(variety);
  //             }
  //
  //
  //     });
  //   }
  //   return genusArray;
  // }

  render() {
    let { genus, title, subtitle, description } = this.state;
    console.log('genusRender', genus)
    // let { hasMultiples } = this.props;
    // if (hasMultiples) {
    //   console.log('has mults', title, description, subtitle);
    // } else {
    //   console.log('no has mults');
    // }
    // let { genusRenderArray } = this.state;
    return (
      <Card key={title}
        expanded={this.state.varietyExpanded}onExpandChange={this.handleExpandChange.bind(this)} className='plant-card'>
        <CardHeader title={<CardTitle     title={title}

          actAsExpander={true}
          children={<Toggle
            toggled={this.state.varietyExpanded}
            onToggle={this.handleToggle.bind(this)}
            labelPosition='left'
            label={genus['Description']}
            />}
            />} />
          {(Object.keys(genus).length > 1) ? Object.keys(genus).map((key, i) => {
            if (key !== 'Description') {
            genus[key].forEach((variety, i) => {
              console.log('sendingVariety')
              return <CatalogVariety variety={variety} key={i} expandable={true} />
            });
            }
          }) : null}
        </Card>
      );
    }
  }

//   <CatalogVariety variety={variety} key={i} title={key} expandable={true} />
// }): null}
